import React, { useState, useContext, useEffect } from "react"
import "./AnimalForm.css"
import AnimalRepository from "../../repositories/AnimalRepository";
import EmployeeRepository from "../../repositories/EmployeeRepository";
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository";
import AnimalCaretakerRepository from "../../repositories/AnimalCaretakerRepository";
import LocationRepository from "../../repositories/LocationRepository";
import { useHistory } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";


export default (props) => {
    const [animalName, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [animals, setAnimals] = useState([])
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState(0)
    const [locations, setLocations] = useState([]);
    const [locationId, setLocationId] = useState(0);
    const [employeeLocations, setEmployeeLocations] = useState([])
    const [saveEnabled, setEnabled] = useState(false)
    const history = useHistory();
    const { getCurrentUser } = useSimpleAuth()

    const constructNewAnimal = evt => {
        evt.preventDefault()
        const eId = parseInt(employeeId)
        const locId = parseInt(locationId);

        if (eId === 0) {
            window.alert("Please select a caretaker")
        } else if(locId === 0) {
            window.alert("Please select a location")
        } else {
            const emp = employees.find(e => e.id === eId)
            const animal = {
                name: animalName,
                breed: breed,
                locationId: parseInt(locationId)
            }

            AnimalRepository.addAnimal(animal)
                .then(animalObj => {
                    AnimalOwnerRepository.assignOwner(animalObj.id, getCurrentUser().id)
                    AnimalCaretakerRepository.assignCaretaker(animalObj.id, eId)
                })
                .then(() => setEnabled(true))
                .then(() => history.push("/animals"))
        }
    }
    
    useEffect(
        () => {
            EmployeeRepository.getAll()
                .then(data => setEmployees(data))
                .then( () => {
                    LocationRepository.getAll()
                        .then(data => setLocations(data));
                })
        },
        []
    )

    useEffect(
        () => {
            LocationRepository.getEmployeeLocationsbyLocation(locationId)
                            .then(data => setEmployeeLocations(data))
        },
        [locationId]
    )

    return (
        <form className="animalForm">
            <h2>Admit Animal to a Kennel</h2>
            <div className="form-group">
                <label htmlFor="animalName">Animal name</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    id="animalName"
                    placeholder="Animal name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={e => setBreed(e.target.value)}
                    id="breed"
                    placeholder="Breed"
                />
            </div>
            <div className="form-group">
                <label htmlFor="location">Our locations</label>
                <select
                    defaultValue=""
                    name="location"
                    id="locationId"
                    className="form-control"
                    onChange={e => setLocationId(e.target.value)}
                >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                        <option key={location.id} id={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="employee">Make appointment with caretaker</label>
                <select
                    defaultValue=""
                    name="employee"
                    id="employeeId"
                    className="form-control"
                    onChange={e => setEmployeeId(e.target.value)}
                >
                    <option value="">Select an employee</option>
                    {employeeLocations.map(empLoc => {
                        const e = empLoc.user;
                        return <option key={e.id} id={e.id} value={e.id}>
                            {e.name}
                        </option>
                    })}
                </select>
            </div>
            <button type="submit"
                onClick={constructNewAnimal}
                disabled={saveEnabled}
                className="btn btn-primary"> Submit </button>
        </form>
    )
}
