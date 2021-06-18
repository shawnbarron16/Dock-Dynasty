import React, {useContext, useEffect} from "react";
import { ListingContext } from "./ListingsProvider"
import { BoatContext } from "../Boats/BoatsProvider";

//A singular component that creates the JSX for all Listings
export const Listings = () => {
    const { listings, getListings } = useContext(ListingContext)
    const { boats, getBoats } = useContext(BoatContext)


    useEffect(() => {
        console.log("Retrieving Listings")
        getBoats()
        getListings()
    }, [])

    return (
        <section className="listings">
            {listings.map(listing => {
                let thisBoatId = parseInt(listing.boatId)
                let thisBoat = boats.find(boat => boat.id === thisBoatId)
                return (
                <div className="listings__listing" key={listing.id} id={`listing--${listing.id}`}>
                    <img src={thisBoat.pictureURL} alt=""></img>
                </div>
                )
            })}
        </section>
    )
}