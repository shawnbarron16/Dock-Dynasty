import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ListingContext } from "./ListingsProvider";
import { BoatContext } from "../Boats/BoatsProvider";

export const ListingForum = () => {
  console.log("Rendering Listing Forum");
  const { listings, getListings, addListings, updateListing, getListingById } = useContext(ListingContext);
  const { boats, getBoats } = useContext(BoatContext);
  const history = useHistory();
  const {listingId} = useParams()
  const [isLoading, setIsLoading] = useState(true);

  /*useEffect(() => {
    getListings()
    .then(() => getBoats())
    .then(() => getListingById(parseInt(listingId)))
  }, []);
  */


  const [listing, setListing] = useState({
    id: "",
    boatId: 0,
    dateListed: "",
    price: "",
    renterId: "",
  });

  const handleControlledInputChange = (evt) => {
    const newListing = { ...listing };
    newListing[evt.target.id] = evt.target.value;
    setListing(newListing);
  };

  const handleClickSaveInput = () => {
    
    const newBoatId = listing.boatId;
    const newPrice = listing.price;
    
    if (newBoatId === null || newPrice === null) {
      window.alert("Please Select a Boat and Set a Price");
    } else {
      setIsLoading(true)
      if(listingId){
        debugger
      const newListing = {
        id: parseInt(listingId),
        boatId: parseInt(newBoatId),
        dateListed: "",
        price: parseInt(newPrice),
        renterId: 0,
      };
      updateListing(newListing).then(history.push("/"))
    } else {
      let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
      const newListing = {
        boatId: parseInt(newBoatId),
        dateListed: today,
        price: newPrice,
        renterId: 0,
      };
      addListings(newListing).then(history.push("/"))
    }
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
                if(parseInt(localStorage.getItem("dd_user")) === boat.owner)
                return (
                  <label key={boat.id}>
                    <input type="radio" id="boatId" key={boat.id} required value={boat.id} onChange={handleControlledInputChange} />
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
