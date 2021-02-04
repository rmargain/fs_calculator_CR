import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Card,
} from "@material-ui/core";

export default function RfcStatus({ setRfcStatus, rfcStatus }) {
  return (
    <div className="input-subcontainer">
      <Card variant="outlined" style={{ padding: "5px", margin: "10px" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">RFC registrado en CR</FormLabel>
          <RadioGroup
            aria-label="RFC registrado"
            name="rfcStatus"
            value={rfcStatus}
            onChange={(e) => setRfcStatus(e.target.value)}
          >
            <FormControlLabel
              value="Si"
              control={
                <Radio
                  style={{
                    padding: "5px 0 5px 10px",
                    marginRight: "10px",
                  }}
                />
              }
              label="Sí"
            />
            <FormControlLabel
              value="No"
              label="No"
              control={
                <Radio
                  style={{
                    padding: "5px 0 5px 10px",
                    marginRight: "10px",
                  }}
                />
              }
            >
            </FormControlLabel>
          </RadioGroup>
        </FormControl>
        {rfcStatus === "No" ? (
          <p style={{ color: "red", fontSize: "0.5em" }}>
            Te recomendamos ingresar tu RFC a CR para disminuir la retención de
            IVA/ISR
          </p>
        ) : null}
      </Card>
    </div>
  );
}
