import {
  OutlinedInput,
  InputAdornment,
  FormLabel,
  IconButton,
  Card,
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function AvgUnitsMonth({
  label,
  averageUnitsMonth,
  setAverageUnitsMonth,
  averageUnitsOrder,
  iserror,
  setIserror,
}) {
  function handleChange({ target: { value } }) {
    let valueToSet = parseFloat(value);
    setAverageUnitsMonth(valueToSet);
    if (valueToSet < averageUnitsOrder) {
      setIserror(true);
    } else {
      setIserror(false);
    }
  }

  function decrement() {
    if (averageUnitsMonth > 1) {
      setAverageUnitsMonth(averageUnitsMonth - 1);
    }
    if (averageUnitsMonth - 1 < averageUnitsOrder) {
      setIserror(true);
    } else {
      setIserror(false);
    }
  }
  function increment() {
    setAverageUnitsMonth(averageUnitsMonth + 1);
    if (averageUnitsMonth + 1 < averageUnitsOrder) {
      setIserror(true);
    } else {
      setIserror(false);
    }
  }

  return (
    <div className="input-subcontainer">
      <Card variant="outlined" style={{ padding: "5px", margin: "10px" }}>
        <FormLabel component="legend">{label}</FormLabel>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <OutlinedInput
              id="outlined-adornment"
              value={averageUnitsMonth}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">U</InputAdornment>
              }
              type="number"
              style={{ width: "90%" }}
              min={3}
              error={iserror}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <IconButton
                onClick={increment}
                style={{
                  width: "50%",
                  height: "50%",
                  padding: "5px 0 5px 10px",
                }}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                onClick={decrement}
                style={{
                  width: "50%",
                  height: "50%",
                  padding: "5px 0 5px 10px",
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </div>
          </div>
          {iserror ? (
            <p style={{ color: "red", fontSize: "0.5em" }}>
              Error: Unidades Mensuales menor a Unidades Por Orden
            </p>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
