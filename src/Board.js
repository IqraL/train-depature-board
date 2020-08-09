import React, { useState, useEffect } from "react";
import TrainStationDropDown from "./TrainStationDropDown";
import Button from "@material-ui/core/Button";
import { useApolloClient, gql } from "@apollo/client";
import {
  boardWrapper,
  selectorHolder,
  headerStyle,
  selectedWrapper,
} from "./css/BoardCss";

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const getQuery = async () => {
    if (!depatureStation) {
      setdepatureStationNeeded(true);
      setSearched(true);
    }
    if (depatureStation) {
      const { data, loading, error } = await client.query({
        query: GET_DEPATURE_BOARD,
        variables: {
          depatureStation: depatureStation,
          alldepartures: destinationStation ? false : true,
          destinationLocation: destinationStation,
          numberOfResults: 5,
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
        {data && searched && <ServicesWrapper data={data} />}
      </div>
    </div>
  );
}

const servicesWrapperCss = {};
function ServicesWrapper(props) {
  return (
    <div style={servicesWrapperCss}>
      {props.data.getDepartureBoard.services.length === 0 ? (
        <div>looks like there are no services running for your search </div>
      ) : (
        props.data.getDepartureBoard.services.map((service) => (
          <Service serviceData={service} />
        ))
      )}
    </div>
  );
}

const serviceWrapperCss = {};
const serviceHeader = {};
const serviceDetail = {};
const serviceExtraDetail = {};
function Service(props) {
  const { serviceData } = props;
  return (
    <div style={serviceWrapperCss}>
      <div style={serviceHeader}></div>
      <div style={serviceDetail}></div>
      <div style={serviceExtraDetail}></div>
    </div>
  );
}

export default Board;
