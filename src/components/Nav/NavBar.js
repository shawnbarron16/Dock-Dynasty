import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <>
            <ul className="navBar">
                <ul className="navBar__item">
                    <Link className="navBar__link" to="/">Home</Link>
                </ul>
                <ul className="navBar__item">
                    <Link className="nacBar__link" to="/AddABoat">Add A Boat</Link>
                </ul>
                <ul className="navBar__item">
                    <Link className="navBar__link" to="/AddAListing">Add A Listing</Link>
                </ul>
                <ul className="navBar__item">
                    <Link className="navBar__link" to="/Profile">Profile</Link>
                </ul>
            </ul>
            <div>
                <img className="logo" src="/Dock-dynasty.png" alt="not found"></img>
            </div>
        </>
    )
}