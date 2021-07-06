import React, {useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { BoatContext } from "./BoatsProvider"

export const BoatForum = () => {
    console.log("Rendering Boat Forum")
    const { boats, getBoats, addBoats } = useContext(BoatContext)
    const history = useHistory()

    useEffect(() => {
        getBoats()
    }, [])

    const [boat, setBoat] = useState({
        id: 0,
        owner: 0,
        pictureURL: "",
        description: "",
        rented: false
    });

    const handleControlledInputChange = (evt) => {
        const newBoat = {...boat}
        newBoat[evt.target.id] = evt.target.value
        setBoat(newBoat)
    }
    
    const handleClickSaveBoat = (evt) => {
        evt.preventDefault()

        const newPictureURL = boat.pictureURL
        const newDescription = boat.description

        if (newPictureURL === "" || newDescription === "") {
            window.alert("Please Make Sure Your Boat has a Picture and a Description")
        } else {
            const newBoat = {
                id: boats.length + 1,
                owner: parseInt(localStorage.getItem("gg_user")),
                pictureURL: newPictureURL,
                description: newDescription,
                rented: false
            }
            addBoats(newBoat)
            .then(() => history.push("/"))
        }
    }

   return (
       <>
        <form>
            <h2>Add A Boat</h2>
            <fieldset>
                <div>
                    <label htmlFor="pictureURL">Picture URL for the Boat</label>
                    <input type="text" id="pictureURL" required autoFocus placeholder="Picture URL" value={boat.pictureURL} onChange={handleControlledInputChange} />
                </div> 
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="description">Description of the Boat</label>
                    <input type="text" id="description" required placeholder="Description" value={boat.description} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button onClick={handleClickSaveBoat}>Save Boat</button>
        </form>
       </>
   )
}