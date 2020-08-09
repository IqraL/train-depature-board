import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import Select from "react-select";

const GET_TRAINSTATION_CODES = gql`
  query getTrainStationCrs {
    getTrainStationCrs {
      name
      crs
    }
  }
`;

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "250px",
  }),
};
function TrainStationDropDown(props) {
  const { data, loading, error } = useQuery(GET_TRAINSTATION_CODES);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(error);
    if (data && data.getTrainStationCrs)
      setOptions(
        data.getTrainStationCrs.map((trainStation) => ({
          label: trainStation.name,
          value: trainStation.crs,
        }))
      );
  }, [data, loading, error]);

  if (loading) return <div>...loading</div>;
  if (error) return <div>Opps looks like there was an error</div>;

  return (
    <Select
      defaultValue={{ key: "default", value: "default" }}
      isSearchable
      name="color"
      options={options}
      onChange={(selectedOption, b, c) => {
        console.log(b, c);
        props.onChange(selectedOption.value);
      }}
      width="250px"
      styles={customStyles}
    />
  );
}

export default TrainStationDropDown;
