import React, { useState, createContext } from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(setUsers)
    }

    const addUsers = userObj => {
        return fetch ("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(userObj)
        })
        .then(getUsers)
    }

    const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
        .then(getUsers)
    }
    return (
        <UserContext.Provider value ={{
            users, getUsers, addUsers, deleteUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}