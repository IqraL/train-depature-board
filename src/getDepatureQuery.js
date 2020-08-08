import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";

export default gql`
  query getTrainStationCrs {
    getTrainStationCrs {
      name
      crs
    }
  }
`;
