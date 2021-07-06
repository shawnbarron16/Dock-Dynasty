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
import { ListingForum } from "./Listings/ListingForum"

export const ApplicationViews = () => {
    return (
      <>
        <NavBar />
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
                  </BoatProvider>
               </ListingsProvider>
        <FooterBar />
      </>
    );
  };