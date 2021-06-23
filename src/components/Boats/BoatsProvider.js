import React, { useState, createContext } from "react";

export const BoatContext = createContext()

export const BoatProvider = (props) => {
    const [boats, setBoats] = useState([])

    const getBoats = () => {
        return fetch("http://localhost:8088/boats")
        .then(res => res.json())
        .then(setBoats)
    }

    const addBoats = boatObj => {
        return fetch ("http://localhost:8088/boats", {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(boatObj)
        })
        .then(getBoats)
    }

    const deleteBoat = boatId => {
        return fetch(`http://localhost:8088/boats/${boatId}`, {
            method: "DELETE"
        })
        .then(getBoats)
    }

    const getBoatById = boatId => {
        return fetch(`http://localhost:8088/boats/${boatId}`)
            .then(res => res.json())
    }
    return (
        <BoatContext.Provider value ={{
            boats, getBoats, addBoats, deleteBoat, getBoatById
        }}>
            {props.children}
        </BoatContext.Provider>
    )
}