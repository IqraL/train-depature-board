import React, { useState } from "react";
import TrainStationDropDown from "./TrainStationDropDown";
import Button from "@material-ui/core/Button";
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
          <Button variant="contained" color="primary">
            Go
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Board;
