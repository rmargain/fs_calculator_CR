import {OutlinedInput, InputAdornment, FormLabel, IconButton, Card} from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Costs({costs, setCosts}) {

    function handleChange({target: {value}}) {
        let valueToSet = parseFloat(value)
        setCosts(valueToSet)
    }

    function decrement(){
        setCosts(costs-1)
    }
    function increment(){
        setCosts(costs+1)
    }
    return (
      <div className="input-subcontainer">
        <Card variant="outlined" style={{ padding: "5px", margin: "10px" }}>
          <FormLabel component="legend">
            Costo (Materiales + Producción)
          </FormLabel>
          <div style={{ display: "flex" }}>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={costs}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              type="number"
              style={{width: '90%'}}
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
        </Card>
      </div>
    );
}
