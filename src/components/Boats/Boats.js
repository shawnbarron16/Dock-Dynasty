import React, { useContext, useEffect } from "react";
import { BoatContext } from "./BoatsProvider";
import { useHistory } from "react-router-dom";

export const Boats = () => {
    const {boats, getBoats} = useContext(BoatContext)
    const history = useHistory()

    useEffect(() => {
        getBoats()
    }, [])

    return(
        <>
            <section className="boats">
                <div className="boats__individualBoat">
                    {boats.map((boat) => {
                        return (
                        <div>
                        <img src={boat.pictureURL} alt="" style={{height:250, width:300}} />
                        <button onClick={() => history.push(`/EditBoat/${boat.id}`)} />
                        </div>
                    )
                    })}
                </div>
            </section>
        </>
    )
}