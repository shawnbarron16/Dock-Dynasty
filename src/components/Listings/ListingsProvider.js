import React, { useState, createContext } from "react";

export const ListingContext = createContext()

export const ListingsProvider = (props) => {
    const [listings, setListings] = useState([])

    const getListings = () => {
        return fetch("http://localhost:8088/boatListing")
        .then(res => res.json())
        .then(setListings)
    }

    const addListings = listingObj => {
        return fetch ("http://localhost:8088/boatListing", {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(listingObj)
        })
        .then(getListings)
    }

    const deleteListing = listingId => {
        return fetch(`http://localhost:8088/boatListing/${listingId}`, {
            method: "DELETE"
        })
        .then(getListings)
    }
    return (
        <ListingContext.Provider value ={{
            listings, getListings, addListings, deleteListing
        }}>
            {props.children}
        </ListingContext.Provider>
    )
}