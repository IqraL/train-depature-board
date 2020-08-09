import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const serviceWrapperCss = {};
const serviceHeader = {};
const serviceDetail = {
  display: "grid",
  gridTemplateColumns: "1fr 0fr",
  alignItems: "center",
};
const serviceDetailHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  gridColumnGap: "5px",
};
const serviceExtraDetail = {};
function Service(props) {
  const { serviceData, depatureStation } = props;
  const { dueTime, origin, destination, operator, etaORetd } = serviceData;
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(serviceData);
  return (
    <div style={serviceWrapperCss}>
      <div style={serviceHeader}>
        {`${dueTime} ${origin.name} to ${destination.name} (operated by ${operator})`}
      </div>
      <div style={serviceDetail}>
        <div style={serviceDetailHeader}>
          <div>{depatureStation.name}</div>
          <div>
            <b>Due:</b>
            {dueTime}
          </div>
          <div>
            <b>Exp:</b>
            {etaORetd}
          </div>
          <div>
            <b>Delayed:</b>
            {serviceData.isDelayed ? `Yes` : `No`}
          </div>
          <div>
            <b>Cancelled:</b>
            {serviceData.isCancelled ? `Yes` : `No`}
          </div>
        </div>
        <IconButton
          color="primary"
          component="span"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      {isExpanded && (
        <div style={serviceExtraDetail}>
          <div>{serviceData.isDelayed && `${serviceData.delayReason}`}</div>
          <div>{serviceData.isCancelled && `${serviceData.cancelReason}`}</div>
        </div>
      )}
    </div>
  );
}

export default Service;
