import React from "react"
import { Link, useLocation } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./SearchResults.css"


export default () => {
    const { getCurrentUser } = useSimpleAuth()
    const location = useLocation()

    const displayAnimals = () => {
        if (location.state?.animals.length) {
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <section className="animals">
                        <ul className="searchResult__list">
                            {location.state.animals.map(animal => {
                                return (
                                    <li>
                                        <Link className="result"
                                        to={{
                                            pathname: `/animals/${animal.id}`
                                        }}>
                                            {animal.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
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
                    <section className="employees searchResultChunk">
                        <ul className="searchResult__list">
                            {location.state.employees.map(employee =>  {
                                return (
                                    <li>
                                        <Link className="result"
                                        to={{
                                            pathname: `/employees/${employee.id}`
                                        }}>
                                            {employee.name}
                                        </Link>
                                    </li>
                                )
                            
                            })}
                        </ul>
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
                    <section className="locations searchResultChunk">
                        <ul className="searchResult__list">
                            {location.state.locations.map(loc => {
                                return (
                                    <li>
                                        <Link className="result"
                                        to={{
                                            pathname: `/locations/${loc.id}`
                                        }}>
                                            {loc.name}
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </section>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <article className="searchResults">
                {getCurrentUser().employee ? displayAnimals() : ""}
                {displayEmployees()}
                {displayLocations()}
            </article>
        </React.Fragment>
    )
}
