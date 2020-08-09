import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "../css/detailsTableCss.css";

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

const tableWrapper = { display: "grid", justifyContent: "center" };
const reasonDiv = { display: "grid", justifyContent: "center", color: "red" };

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
          <div style={reasonDiv}>
            <b>{serviceData.isDelayed && `${serviceData.delayReason}`}</b>
          </div>
          <div style={reasonDiv}>
            <b>{serviceData.isCancelled && `${serviceData.cancelReason}`}</b>
          </div>
          <div style={tableWrapper}>
            <table class="steelBlueCols">
              <thead>
                <tr>
                  <th>Station</th>
                  <th>Due</th>
                  <th>Expected</th>
                  <th>Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{depatureStation.name}</td>
                  <td>{dueTime}</td>
                  <td>{etaORetd}</td>
                  <td>{serviceData.platform}</td>
                </tr>

                {serviceData.callingPoints &&
                  serviceData.callingPoints.length > 0 &&
                  serviceData.callingPoints.map((cp) => {
                    if (cp)
                      return (
                        <tr>
                          <td>{cp.trainStation.name}</td>
                          <td>{cp.duetime}</td>
                          <td>{cp.etORat}</td>
                          <td></td>
                        </tr>
                      );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
