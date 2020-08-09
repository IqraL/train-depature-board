import React from "react";
import Service from "./Service";
const servicesWrapperCss = {
  display: "grid",
  justifyContent: "center",
  gridRowGap: "15px",
};
function ServicesWrapper(props) {
  return (
    <div style={servicesWrapperCss}>
      {props.data.getDepartureBoard.services.length === 0 ? (
        <div>looks like there are no services running for your search </div>
      ) : (
        props.data.getDepartureBoard.services.map((service) => (
          <Service
            depatureStation={props.data.getDepartureBoard.depatureStation}
            serviceData={service}
            key={service.serviceID}
          />
        ))
      )}
    </div>
  );
}

export default ServicesWrapper;
