import React, { useState, useEffect } from "react";
import { useApolloClient, gql } from "@apollo/client";

import Button from "@material-ui/core/Button";
import {
  boardWrapper,
  selectorHolder,
  headerStyle,
  selectedWrapper,
} from "./css/BoardCss";

import TrainStationDropDown from "./components/TrainStationDropDown";
import ServicesWrapper from "./components/ServicesWrapper";

import GET_DEPATURE_BOARD from "./getDepatureQuery";

function Board() {
  const [depatureStation, setDepatureStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [allDepatures, setAllDepatures] = useState(true);

  const [depatureStationNeeded, setdepatureStationNeeded] = useState(true);
  const [searched, setSearched] = useState(false);

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const client = useApolloClient();

  useEffect(() => {
    if (depatureStation) setdepatureStationNeeded(false);
  }, [depatureStation]);

  const getQuery = async () => {
    if (!depatureStation) {
      setdepatureStationNeeded(true);
      setSearched(true);
    }
    if (depatureStation) {
      const { data, loading, error } = await client.query({
        query: GET_DEPATURE_BOARD,
        variables: {
          depatureStation: depatureStation.value,
          alldepartures: destinationStation ? false : true,
          destinationLocation: destinationStation
            ? destinationStation.value
            : null,
          numberOfResults: 10,
        },
      });
      if (error) {
        setError(true);
        console.log(error);
      }
      setData(data);
      setSearched(true);
    }
  };

  return (
    <div style={boardWrapper}>
      <div style={headerStyle}>
        <h2>Train Depature Board</h2>
      </div>
      <div style={selectorHolder}>
        <div style={selectedWrapper}>
          <div>Depature Station :</div>
          <TrainStationDropDown
            name="Depature Station"
            onChange={(value) => setDepatureStation(value)}
            value={depatureStation}
          />
        </div>
        <div style={selectedWrapper}>
          <div>Destination Station :</div>
          <TrainStationDropDown
            name="Destination Station"
            isDisabled={allDepatures}
            onChange={(value) => setDestinationStation(value)}
            value={destinationStation}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              getQuery();
            }}
          >
            Go
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDepatureStation(null);
              setDestinationStation(null);
              setData(null);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      <div>
        {depatureStationNeeded && searched && (
          <div>Please select a Depature station</div>
        )}
        {error && <div>...looks like there was an error</div>}
        {data && searched && <ServicesWrapper data={data} />}
      </div>
    </div>
  );
}

export default Board;
