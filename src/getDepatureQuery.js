import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";

export default gql`
  query getDepartureBoard(
    $depatureStation: String!
    $alldepartures: Boolean!
    $destinationLocation: String
    $numberOfResults: Int
  ) {
    getDepartureBoard(
      depatureStation: $depatureStation
      alldepartures: $alldepartures
      destinationLocation: $destinationLocation
      numberOfResults: $numberOfResults
    ) {
      depatureStation {
        name
        crs
      }
      messages
      services {
        serviceID
        dueTime
        etaORetd
        noOfCarriages
        platform
        origin {
          name
          crs
        }
        destination {
          name
          crs
        }
        callingPoints {
          trainStation {
            name
            crs
          }
          duetime
          etORat
          noOfCarriages
        }
        isDelayed
        delayReason
        isCancelled
        cancelReason
        operator
      }
    }
  }
`;
