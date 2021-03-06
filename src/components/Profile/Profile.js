import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./ProfileProvider";
import { BoatContext } from "../Boats/BoatsProvider";
import { ListingContext } from "../Listings/ListingsProvider";
import { useHistory, Link } from "react-router-dom";
import "./ProfileStyle.css";

export const UserProfile = () => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});
  const { boats, getBoats, deleteBoat } = useContext(BoatContext);
  const { listings, getListings, deleteListing } = useContext(ListingContext);
  const history = useHistory();

  useEffect(() => {
    getBoats();
    getListings();
    getUserById(parseInt(localStorage.getItem("dd_user"))).then((data) =>
      setUser(data)
    );
  }, []);

  return (
    <section className="user">
      <h2
        className="user__name"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {user.name}
      </h2>
      <h2>Your Boats</h2>
      <section
        className="user__boats"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        {boats.map((boat) => {
          if (parseInt(localStorage.getItem("dd_user")) === boat.owner)
            return (
              <div
                className="boats__individualBoat"
                key={boat.id}
                id={`boat--${boat.id}`}
                style={{
                  display: "flex",
                  flexFlow: "column wrap",
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                  marginLeft: 10,
                  marginRight: 10,
                  maxWidth: 300,
                  maxHeight: 400,
                  justifyContent: "space-around",
                }}
              >
                <img
                  src={boat.pictureURL}
                  alt=""
                  style={{ height: 250, width: 300 }}
                />
                {boat.description}
                <button onClick={() => {
                  let answer = window.confirm("Are You Sure You Want to Delete This Boat?")
                  if(answer) {
                    let thisListing = listings.find((listing) => boat.id === listing.boatId)
                    deleteListing(thisListing.id)
                    .then(deleteBoat(boat.id))
                  }}}>Delete Boat</button>
                <button onClick={() => history.push(`/EditBoat/${boat.id}`)}>
                  Edit Boat
                </button>
              </div>
            );
        })}
      </section>
      <h2>Your Listings</h2>
      <div
        className="user__listings"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        {listings.map((listing) => {
          let thisBoatId = parseInt(listing.boatId);
          let thisBoat = boats.find((boat) => boat.id === thisBoatId);
          if (parseInt(localStorage.getItem("dd_user")) === thisBoat.owner)
            return (
              <div
                className="user__listing"
                key={`listing--${listing.id}`}
                id={`listing--${listing.id}`}
                style={{
                  display: "flex",
                  flexFlow: "column wrap",
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                  marginLeft: 10,
                  marginRight: 10,
                  maxWidth: 300,
                  maxHeight: 400,
                  justifyContent: "space-around",
                }}
              >
                <img
                  className="listing__image"
                  src={thisBoat && thisBoat.pictureURL}
                  alt=""
                  style={{ height: 250, width: 300 }}
                ></img>
                {thisBoat && thisBoat.description}
                {thisBoat && thisBoat.price}
                <button
                  onClick={() =>
                    deleteListing(listing.id)
                  }
                >
                  Delete Listing
                </button>
                <button
                  onClick={() => {
                    history.push(`/EditListings/${listing.id}`);
                  }}
                >
                  Edit Listing
                </button>
              </div>
            );
        })}
      </div>
    </section>
  );
};
