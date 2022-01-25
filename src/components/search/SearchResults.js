import React from "react"
import { Link, useLocation } from "react-router-dom";
import "./SearchResults.css"


export default () => {
    const location = useLocation()

    const displayAnimals = () => {
        if (location.state?.animals.length) {
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <section className="animals">
                        {location.state.animals.map(animal => {
                            return (
                                <Link className="result"
                                to={{
                                    pathname: `/animals/${animal.id}`
                                }}>
                                    {animal.name}
                                </Link>
                            )
                    
                        })}
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayEmployees = () => {
        if (location.state?.employees.length) {
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees">
                        {location.state.employees.map(employee =>  {
                            return (
                                <Link className="result"
                                to={{
                                    pathname: `/employees/${employee.id}`
                                }}>
                                    {employee.name}
                                </Link>
                            )
                        
                        })}
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayLocations = () => {
        if (location.state?.locations.length) {
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        {location.state.locations.map(loc => {
                            return (
                                <Link className="result"
                                to={{
                                    pathname: `/locations/${loc.id}`
                                }}>
                                    {loc.name}
                                </Link>
                            )
                            
                        })}
                    </section>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <article className="searchResults">
                {displayAnimals()}
                {displayEmployees()}
                {displayLocations()}
            </article>
        </React.Fragment>
    )
}
