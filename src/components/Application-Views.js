import React from "react";
import { Route } from "react-router-dom";
import { ListingsProvider } from "./Listings/ListingsProvider";
import { Listings } from "./Listings/Listings";
import { BoatProvider } from "./Boats/BoatsProvider";
import { NavBar } from "./Nav/NavBar";
import { FooterBar } from "./Nav/FooterBar";
import { Contact } from "./Conatact";
import { IndividualListing } from "./Listings/IndividualListing";
import { BoatForum } from "./Boats/BoatForum";
import { ListingForum } from "./Listings/ListingForum";
import { UserProfile } from "./Profile/Profile";
import { UserProvider } from "./Profile/ProfileProvider";
import "./Application-Views.css"

export const ApplicationViews = () => {
  return (
    <>
      <NavBar />
      <section className="main--container">
      <UserProvider>
        <ListingsProvider>
          <BoatProvider>
            <Route exact path="/">
              <Listings />
            </Route>
            <Route exact path="/Contact">
              <Contact />
            </Route>
            <Route exact path="/listings/:listingId(\d+)">
              <IndividualListing />
            </Route>
            <Route exact path="/AddABoat">
              <BoatForum />
            </Route>
            <Route exact path="/AddAListing">
              <ListingForum />
            </Route>
            <Route exact path="/Profile">
              <UserProfile />
            </Route>
            <Route path="/EditListings/:listingId(\d+)">
              <ListingForum />
            </Route>
            <Route path="/EditBoat/:boatId(\d+)">
              <BoatForum />
            </Route>
          </BoatProvider>
        </ListingsProvider>
      </UserProvider>
      </section>
      <FooterBar />
    </>
  );
};
