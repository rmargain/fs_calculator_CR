import {OutlinedInput, InputAdornment, FormLabel, IconButton, Card} from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function AvgUnitsMonth({label, averageUnitsMonth, setAverageUnitsMonth}) {
    
    function handleChange({target: {value}}) {
        let valueToSet = parseFloat(value)
        setAverageUnitsMonth(valueToSet)

    }

    function decrement(){
        setAverageUnitsMonth(averageUnitsMonth -1)
    }
    function increment(){
        setAverageUnitsMonth(averageUnitsMonth +1)
    }

    return (
        <div>
        <Card variant="outlined" style={{padding:"5px", margin: "10px"}}>
        
            <FormLabel component="legend">{label}</FormLabel>
            <div style={{display: "flex"}}>

            <OutlinedInput
            id="outlined-adornment"
            value={averageUnitsMonth}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">U</InputAdornment>}
            type="number"
            className="numberInput"
          /> 
          <div style={{display: "flex", flexDirection:"column"}}>
          <IconButton onClick={increment} style={{width: "50%", height: "50%", padding: "5px 0 5px 10px"}}>
                <AddCircleIcon/>
            </IconButton>
          <IconButton onClick={decrement} style={{width: "50%", height: "50%", padding: "5px 0 5px 10px"}}>
                <RemoveCircleIcon/>
            </IconButton>   
          </div>
            </div>
            </Card>   
        </div>
    )
}
