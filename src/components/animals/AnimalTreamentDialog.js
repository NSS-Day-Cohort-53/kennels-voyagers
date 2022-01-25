import React, { useState } from "react"
import TreatmentRepository from "../../repositories/TreatmentRepository"

export const AnimalTreatmentDialog = ({toggleTreatmentDialog, animal, addTreatmentToDb}) => {
    const [description, updateDescription] = useState("")
    

    const handleUserInput = (event) => {
        updateDescription(event.target.value)
    }

    return (
        <dialog id="dialog--animal--treament" className="dialog--animal--treament">
            <h2 style={{ marginBottom: "1.3em" }}>Add treatment for {animal.name}</h2>
            <form className="treatmentForm">
                <div className="form-group">
                    <label htmlFor="treatmentName">Treatment description</label>
                    <input onChange={handleUserInput}
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="nails trimmed..."
                        value={description}
                    />
                </div>
                <button
                id="closeBtn"
                onClick={ (evt) => {
                    evt.preventDefault()
                    
                    const newTreatment = {
                        animalId: animal.id,
                        timestamp: Date.now(),
                        description: description
                    }
                    updateDescription("");
                    animal.treatments.push(newTreatment)
                    addTreatmentToDb(newTreatment, animal)

                }}>Add</button>
                <button style={{
                    position: "absolute",
                    top: "1em",
                    right: "2em"
                    }}
                id="closeBtn"
                onClick={toggleTreatmentDialog}>close</button>
            </form>
            
        </dialog>
    )
}
