import React, { useState } from "react";
import TrainStationDropDown from "./TrainStationDropDown";
const boardWrapper = {
  display: "grid",
  justifyContent: "center",
  minWidth: "fit-content",
};
const selectorHolder = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridColumnGap: "50px",
};
const headerStyle = {
  textDecoration: "underline",
  fontSize: "large",
};
function Board() {
  const [depatureStation, setDepatureStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [allDepatures, setAllDepatures] = useState(true);

  return (
    <div style={boardWrapper}>
      <div style={headerStyle}>Train Depature Board</div>
      <div style={selectorHolder}>
        <div>
          <TrainStationDropDown
            name="Depature Station"
            onChange={(value) => setDepatureStation(value)}
          />
        </div>
        <div>
          <TrainStationDropDown
            name="Destination Station"
            isDisabled={allDepatures}
            onChange={(value) => setDestinationStation(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
