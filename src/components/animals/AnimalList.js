import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Animal } from "./Animal"
import { AnimalDialog } from "./AnimalDialog"
import AnimalRepository from "../../repositories/AnimalRepository"
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository"
import useModal from "../../hooks/ui/useModal"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import OwnerRepository from "../../repositories/OwnerRepository"
import TreatmentRepository from "../../repositories/TreatmentRepository"

import "./AnimalList.css"
import "./cursor.css"
import { AnimalTreatmentDialog } from "./AnimalTreamentDialog"


export const AnimalListComponent = (props) => {
    const [animals, petAnimals] = useState([])
    const [animalOwners, setAnimalOwners] = useState([])
    const [owners, updateOwners] = useState([])
    const [currentAnimal, setCurrentAnimal] = useState({ treatments: [] })
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    let { toggleDialog, modalIsOpen } = useModal("#dialog--animal")
    let treatmentDialogModal = useModal("#dialog--animal--treament")

    const toggleTreatmentDialog = treatmentDialogModal.toggleDialog;

    const syncAnimals = () => {
        AnimalRepository.getAll().then(data => {
            if (!getCurrentUser().employee) {
                data = data.filter(animalObj => animalObj.animalOwners.find(animalOwner => animalOwner.userId === getCurrentUser().id))
            }
            petAnimals(data)
        })
    }

    useEffect(() => {
        OwnerRepository.getAllCustomers().then(data => updateOwners(data))
        AnimalOwnerRepository.getAll().then(data => setAnimalOwners(data))
        syncAnimals()
    }, [])

    const showTreatmentHistory = animal => {
        setCurrentAnimal(animal)
        toggleDialog()
    }

    const addTreatment = animal => {
        setCurrentAnimal(animal)
        toggleTreatmentDialog();
    }

    const addTreatmentToDb = (newTreatment, animal) => {
        TreatmentRepository.addTreatment(newTreatment)
            .then(() => {
                syncAnimals();
                setCurrentAnimal(animal)
            });

        toggleTreatmentDialog();
    }

    useEffect(() => {
        const handler = e => {
            if (e.keyCode === 27 && modalIsOpen) {
                toggleDialog()
            }
        }

        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog, modalIsOpen])
    
    useEffect(() => {
        const handler = e => {
            if (e.keyCode === 27 && treatmentDialogModal.modalIsOpen) {
                toggleTreatmentDialog()
            }
        }

        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [toggleTreatmentDialog, treatmentDialogModal.modalIsOpen])


    return (
        <>
            <AnimalDialog toggleDialog={toggleDialog} animal={currentAnimal}/>
            <AnimalTreatmentDialog toggleTreatmentDialog={toggleTreatmentDialog} animal={currentAnimal} addTreatmentToDb={addTreatmentToDb}/>


            {
                getCurrentUser().employee
                    ? ""
                    : <div className="centerChildren btn--newResource">
                        <button type="button"
                            className="btn btn-success "
                            onClick={() => { history.push("/animals/new") }}>
                            Register Animal
                        </button>
                    </div>
            }


            <ul className="animals">
                {
                    animals.map(anml =>
                        <Animal key={`animal--${anml.id}`} animal={anml}
                            animalOwners={animalOwners}
                            owners={owners}
                            syncAnimals={syncAnimals}
                            setAnimalOwners={setAnimalOwners}
                            showTreatmentHistory={showTreatmentHistory}
                            addTreatment={addTreatment}
                        />)
                }
            </ul>
        </>
    )
}
