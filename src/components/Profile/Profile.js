import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./ProfileProvider";
import { BoatContext } from "../Boats/BoatsProvider";
import { ListingContext } from "../Listings/ListingsProvider";
import { useHistory } from "react-router";

export const UserProfile = () => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});
  const { boats, getBoats } = useContext(BoatContext);
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
    <section className="user_boats">
      <div>
        <h2>
          {user.name}
        </h2>
      </div>
      <div>
      </div>
      <div>
        <h2>Your Listings</h2>
        {listings.map((listing) => {
          let thisBoatId = parseInt(listing.boatId);
          let thisBoat = boats.find((boat) => boat.id === thisBoatId);
          return (
            <div
              className="listings__listing"
              key={listing.id}
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
                  deleteListing(listing.id).then(history.push("/"))
                }
              >
                Delete
              </button>
              <button onClick={() => {
                history.push(`/EditListings/${listing.id}`)
              }}>
                Edit Listing
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
