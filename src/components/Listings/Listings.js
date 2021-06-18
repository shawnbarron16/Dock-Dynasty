import React, { useContext, useEffect } from "react";
import { ListingContext } from "./ListingsProvider";
import { BoatContext } from "../Boats/BoatsProvider";
import "./ListingsStyle.css"

//A singular component that creates the JSX for all Listings
export const Listings = () => {
  const { listings, getListings } = useContext(ListingContext);
  const { boats, getBoats } = useContext(BoatContext);

  useEffect(() => {
    console.log("Retrieving Listings");
    getBoats();
    getListings();
  }, []);

  return (
    <section className="listings">
      {listings.map((listing) => {
        let thisBoatId = parseInt(listing.boatId);
        let thisBoat = boats.find((boat) => boat.id === thisBoatId);
        return (
          <div className="listings__listing" key={listing.id} id={`listing--${listing.id}`}
          style={{display: "flex", flexFlow: "column wrap", borderColor: "black", borderStyle: "solid", borderWidth: 2}}>
            <img className="listing__image" src={thisBoat.pictureURL} alt="" style={{height: 250, width: 300 }}></img>
            {thisBoat.description}
            <button>See More</button>
          </div>
        );
      })}
    </section>
  );
};
