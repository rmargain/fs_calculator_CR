import {OutlinedInput, InputAdornment, FormLabel, IconButton, Card} from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function AverageUnitsOrder({label, averageUnitsOrder, setAverageUnitsOrder, setAverageUnitsMonth, averageUnitsMonth, iserror, setIserror}) {

    function handleChange({target: {value}}) {
        let valueToSet = parseFloat(value)
            setAverageUnitsOrder(valueToSet)
        if(AverageUnitsOrder < 0){
          setAverageUnitsOrder(1)
        }
        
        if(valueToSet > averageUnitsMonth){
            setIserror(true)
        } else{
          setIserror(false)
        }
      
    }

    function decrement(){
        if(averageUnitsOrder > 1){
        setAverageUnitsOrder(averageUnitsOrder-1)
        }
        if (averageUnitsOrder - 1 > averageUnitsMonth) {
          setIserror(true);
        } else {
          setIserror(false);
        }
    }
    function increment(){
        setAverageUnitsOrder(averageUnitsOrder+1)
        if (averageUnitsOrder + 1 > averageUnitsMonth) {
          setIserror(true);
        } else {
          setIserror(false);
        }
    }

    return (
      <div className="input-subcontainer">
        <Card variant="outlined" style={{ padding: "5px", margin: "10px" }}>
          <FormLabel component="legend">{label}</FormLabel>
          <div style={{ display: "flex" }}>
            <OutlinedInput
              id="outlined-adornment"
              value={averageUnitsOrder}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">U</InputAdornment>
              }
              type="number"
              style={{ width: "90%" }}
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
