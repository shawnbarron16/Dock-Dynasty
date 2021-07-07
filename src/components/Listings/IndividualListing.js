import React, { useContext, useEffect, useState } from "react";
import { ListingContext } from "./ListingsProvider";
import { BoatContext } from "../Boats/BoatsProvider";
import { useParams, useHistory } from "react-router-dom";

//A component that handles the viewing of a singular listing with expanded information
export const IndividualListing = () => {
  const { getListingById, deleteListing, updateListing } = useContext(ListingContext);
  const { boats, getBoatById, updateBoat } = useContext(BoatContext);
  const [listing, setListing] = useState({});
  const [boat, setBoat] = useState([]);
  const { listingId } = useParams();
  const history = useHistory()

  useEffect(() => {
    console.log("Getting Individual Listing");
    getListingById(listingId).then((data) => setListing(data));
  }, []);

  useEffect(() => {
    getBoatById(listing.boatId).then((data) => setBoat(data));
  }, [listing]);

  const handleClickRent = () => {
    const newBoat = {
      rented: true
    }
    updateBoat(newBoat)
    .then(deleteListing(listingId))
    .then(history.push("/"))
  }

  return (
    <>
      <section className="singleListing__boat">
        <article className="singleListing__boat__picture">
          <div>
            <img
              src={boat.pictureURL}
              alt=""
              style={{ height: 250, width: 300 }}
            ></img>
          </div>
        </article>
        <article className="singleListing__boat__description">
          {boat.description}
        </article>
      </section>
      <section className="singleListing__info">
        <article className="singleListing__info__date">
          Listed on: {listing.dateListed}
        </article>
        <article className="singleListing__info__price">
          {listing.price}
        </article>
        <article className="singleListing__info__rent">
          <button onClick={handleClickRent}>RENT</button>
        </article>
      </section>
    </>
  );
};
