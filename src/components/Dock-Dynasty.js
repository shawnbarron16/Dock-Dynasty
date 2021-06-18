import React from "react";
import { ListingsProvider } from "./Listings/ListingsProvider";
import { Listings } from "./Listings/Listings";
import { BoatProvider } from "./Boats/BoatsProvider";

export const DockDynasty = () => {
    return (
        <>
        <ListingsProvider>
            <BoatProvider>
                <Listings />
            </BoatProvider>
        </ListingsProvider>
        </>
    )
}