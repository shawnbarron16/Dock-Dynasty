import React, { useContext, useEffect } from "react";
import { ListingContext } from "./ListingsProvider";
import { BoatContext } from "../Boats/BoatsProvider";
import "./ListingsStyle.css"
import { useHistory } from "react-router-dom";

//A singular component that creates the JSX for all Listings of the homepage 
export const Listings = () => {
  const { listings, getListings } = useContext(ListingContext);
  const { boats, getBoats } = useContext(BoatContext);
  const history = useHistory()

  useEffect(() => {
    console.log("Retrieving Listings...Retrieving Boats...");
    getBoats()
    .then(()=> getListings())
  }, []);

  return (
    <section className="listings">
      {listings.map((listing) => {
        let thisBoatId = parseInt(listing.boatId);
        let thisBoat = boats.find((boat) => boat.id === thisBoatId);
        return (
          <div className="listings__listing" key={listing.id} id={`listing--${listing.id}`}
          style={{display: "flex", flexFlow: "column wrap", borderColor: "black", borderStyle: "solid", 
          borderWidth: 2, marginLeft: 10, marginRight: 10, maxWidth:300, maxHeight:400, justifyContent: "space-around"}}>
            <img className="listing__image" src={thisBoat && thisBoat.pictureURL} alt="" style={{height: 250, width: 300 }}/>
            {thisBoat && thisBoat.description}
            <button onClick={ () => history.push(`/listings/${listing.id}`)}>See More</button>
          </div>
        );
      })}
    </section>
  );
};