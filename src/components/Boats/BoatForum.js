import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BoatContext } from "./BoatsProvider";

export const BoatForum = () => {
  console.log("Rendering Boat Forum");
  const { boats, getBoats, addBoats, updateBoat } = useContext(BoatContext);
  const history = useHistory();
  const [isLoading, setIdLoading] = useState(true);
  const { boatId } = useParams();

  const handleTitle = () => {
    if (boatId) {
      return <h2>Edit This Boat</h2>;
    } else {
      return <h2>Add a Boat</h2>;
    }
  };

  const [boat, setBoat] = useState({
    id: 0,
    owner: 0,
    pictureURL: "",
    description: "",
    rented: false,
  });

  const handleControlledInputChange = (evt) => {
    const newBoat = { ...boat };
    newBoat[evt.target.id] = evt.target.value;
    setBoat(newBoat);
  };

  const handleClickSaveBoat = (evt) => {
    evt.preventDefault();

    const newPictureURL = boat.pictureURL;
    const newDescription = boat.description;

    if (newPictureURL === "" || newDescription === "") {
      window.alert(
        "Please Make Sure Your Boat has a Picture and a Description"
      );
    } else {
      if (boatId) {
        const newBoat = {
          id: parseInt(boatId),
          owner: parseInt(localStorage.getItem("dd_user")),
          pictureURL: newPictureURL,
          description: newDescription,
          rented: false,
          repairing: false,
        };
        updateBoat(newBoat).then(() => history.push("/"));
      } else {
        const newBoat = {
          owner: parseInt(localStorage.getItem("dd_user")),
          pictureURL: newPictureURL,
          description: newDescription,
          rented: false,
          repairing: false,
        };
        addBoats(newBoat).then(() => history.push("/"));
      }
    }
  };

  useEffect(() => {
    getBoats();
  }, []);

  return (
    <>
      <form>
        <section>{handleTitle()}</section>
        <fieldset>
          <div>
            <label htmlFor="pictureURL">Picture URL for the Boat</label>
            <input
              type="text"
              id="pictureURL"
              required
              autoFocus
              placeholder="Picture URL"
              value={boat.pictureURL}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="description">Description of the Boat</label>
            <input
              type="text"
              id="description"
              required
              placeholder="Description"
              value={boat.description}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <button onClick={handleClickSaveBoat}>Save Boat</button>
      </form>
    </>
  );
};
