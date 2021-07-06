import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListingContext } from "./ListingsProvider";
import { BoatContext } from "../Boats/BoatsProvider";

export const ListingForum = () => {
  console.log("Rendering Listing Forum");
  const { listings, getListings, addListings } = useContext(ListingContext);
  const { boats, getBoats } = useContext(BoatContext);
  const history = useHistory();
  const currentUserId = localStorage.getItem("gg_user");
  let currentUsersBoatsArray = [];

  const setCurrentUserBoatArray = () => {
      for(const boat of boats) {
          if(boat.owner === currentUserId) {
              currentUsersBoatsArray.push(boat)
          }
      }
  }

  useEffect(() => {
    getListings();
    getBoats()
  }, []);

  useEffect(() => {
      setCurrentUserBoatArray()
  }, [])

  const [listing, setListing] = useState({
    id: 0,
    boatId: 0,
    dateListed: "",
    price: 0,
    renterId: 0,
  });

  const handleControlledInputChange = (evt) => {
    const newListing = { ...listing };
    newListing[evt.target.id] = evt.target.value;
    setListing(newListing);
  };

  const handleClickSaveInput = (evt) => {
    evt.preventDefault();

    const newBoatId = listing.boatId;
    const newPrice = listing.price;

    if (newBoatId === null || newPrice === null) {
      window.alert("Please Select a Boat and Set a Price");
    } else {
      const newListing = {
        id: listings.length + 1,
        boatId: newBoatId,
        dateListed: "",
        price: newPrice,
        renterId: 0,
      };
      addListings(newListing).then(() => history.push("/"));
    }
  };

  return (
    <>
      <form>
        <h2>Add A Listing</h2>
        <fieldset>
          <div>
            <label>Choose A Boat</label>
          </div>
          <div>
            {boats &&
              boats.map((boat) => {
                return (
                  <label key={boat.id}>
                    <input type="radio" id="boatId" key={boat.id} required value={listing.boatId} onChange={handleControlledInputChange} />
                    {boat.id}
                    <img className="listing__image" src={boat && boat.pictureURL} alt="" style={{height: 250, width: 300 }}></img>
                  </label>
                );
              })}
          </div>
        </fieldset>
        <fieldset>
            <div>
                <label htmlFor="price">Set A Price</label>
                <input type="text" id="price" required placeholder="$0" value={listing.price} onChange={handleControlledInputChange} />
            </div>
        </fieldset>
        <button onClick={handleClickSaveInput}>Save Listing</button>
      </form>
    </>
  );
};
