import {FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Card} from '@material-ui/core'

export default function StoreSubscription({setSubscription, subscription}) {
    return (
      <div className="input-subcontainer">
        <Card variant="outlined" style={{ padding: "5px", margin: "10px" }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo de suscripción</FormLabel>
            <RadioGroup
              aria-label="Tipo de Suscripción"
              value={subscription}
              name="subscription"
              onChange={(e) => {
                setSubscription(e.target.value);
              }}
            >
              <FormControlLabel
                value="Standard"
                control={
                  <Radio
                    style={{
                      padding: "5px 0 5px 10px",
                      marginRight: "10px",
                    }}
                  />
                }
                label="Standard"
              />
              <FormControlLabel
                value="Plus"
                control={
                  <Radio
                    style={{
                      padding: "5px 0 5px 10px",
                      marginRight: "10px",
                    }}
                  />
                }
                label="Plus"
              />
            </RadioGroup>
          </FormControl>
        </Card>
      </div>
    );
}


