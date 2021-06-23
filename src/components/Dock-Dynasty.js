import React from "react";
import { Route } from "react-router-dom";
import { ListingsProvider } from "./Listings/ListingsProvider";
import { Listings } from "./Listings/Listings";
import { BoatProvider } from "./Boats/BoatsProvider";
import { UserProvider } from "./Profile/ProfileProvider";
import { NavBar } from "./Nav/NavBar";
import { FooterBar } from "./Nav/FooterBar";
import { Contact } from "./Conatact";
import { IndividualListing } from "./Listings/IndividualListing";

export const DockDynasty = () => {
  return (
    <>
      <NavBar />
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
                </BoatProvider>
             </ListingsProvider>
         </UserProvider>
      <FooterBar />
    </>
  );
};
