import React, { useState, useEffect } from "react";
import TrainStationDropDown from "./TrainStationDropDown";
import Button from "@material-ui/core/Button";
import { useApolloClient, gql } from "@apollo/client";

import GET_DEPATURE_BOARD from "./getDepatureQuery";

const boardWrapper = {
  display: "grid",
  justifyContent: "center",
  minWidth: "fit-content",
  paddingTop: "100px",
  gridRowGap: "50px",
};
const selectorHolder = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 0fr",
  gridColumnGap: "50px",
};
const headerStyle = {
  display: "grid",
  justifyContent: "center",
  textDecoration: "underline",
};
const selectedWrapper = {
  display: "grid",
  gridTemplateColumns: "0fr 1fr",
  gridColumnGap: "15px",
};

function Board() {
  const [depatureStation, setDepatureStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [allDepatures, setAllDepatures] = useState(true);

  const [depatureStationNeeded, setdepatureStationNeeded] = useState(true);
  const [searched, setSearched] = useState(false);

  const [error, setError] = useState(false);

  const client = useApolloClient();

  // const [getDepartureBoard, { loading, data, error }] = useLazyQuery(
  //   GET_DEPATURE_BOARD
  // );

  useEffect(() => {
    if (depatureStation) setdepatureStationNeeded(false);
  }, [depatureStation]);

  // useEffect(async () => {
  //   if (searched && depatureStation) {
  //     getDepartureBoard({
  //       variables: {
  //         depatureStation: "EUS",
  //         alldepartures: false,
  //         destinationLocation: "MAN",
  //         numberOfResults: 2,
  //       },
  //     });
  //       setSearched(false);
  //   }
  // }, [searched]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const getQuery = async () => {
    if (!depatureStation) setdepatureStationNeeded(true);
    if (depatureStation) {
      const { data, loading, error } = await client.query({
        query: GET_DEPATURE_BOARD,

        variables: {
          depatureStation: depatureStation,
          alldepartures: false,
          destinationLocation: "MAN",
          numberOfResults: 2,
        },
      });
      if (error) {
        setError(true);
        console.log(error);
      }
      console.log(data);
    }
  };

  console.log(depatureStationNeeded, searched, depatureStation);

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
          />
        </div>
        <div style={selectedWrapper}>
          <div>Destination Station :</div>
          <TrainStationDropDown
            name="Destination Station"
            isDisabled={allDepatures}
            onChange={(value) => setDestinationStation(value)}
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
      </div>
      <div>
        {depatureStationNeeded && searched && (
          <div>Please select a Depature station</div>
        )}
        {error && <div>...looks like there was an error</div>}
      </div>
    </div>
  );
}

export default Board;
