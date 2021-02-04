import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Card, FormLabel } from "@material-ui/core";

function valuetext(value) {
  return value;
}

export default function ShipmentDist({
  moto,
  auto,
  national,
  setMoto,
  setAuto,
  setNational,
}) {
  const [value, setValue] = useState([33, 66]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMoto(newValue[0]);
    setAuto(newValue[1] - newValue[0]);
    setNational(100 - newValue[1]);
  };

  return (
    <div className="input-subcontainer">
      <Card variant="outlined" style={{ padding: "5px", margin: "10px" }}>
        <FormLabel component="legend">Distribución de tipos de envío</FormLabel>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption">Ex. Moto</Typography>
          <br />
          <Typography variant="caption">Ex. Auto</Typography>
          <br />
          <Typography variant="caption">Nacional</Typography>
        </div>

        <Slider
          className="slider"
          track={false}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider-demo"
          getAriaValueText={valuetext}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption">{moto}%</Typography>
          <br />
          <Typography variant="caption">{auto}%</Typography>
          <br />
          <Typography variant="caption">{national}%</Typography>
        </div>
      </Card>
    </div>
  );
}
