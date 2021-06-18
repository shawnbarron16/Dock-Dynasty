import React, { useContext, useEffect } from "react";
import { ListingContext } from "./ListingsProvider";
import { BoatContext } from "../Boats/BoatsProvider";

export const IndividualListing = () => {
    const { listings, getListings } = useContext(ListingContext);
    const { boats, getBoats } = useContext(BoatContext)

    useEffect(() => {
        getListings()
        getBoats()
    },[])
}