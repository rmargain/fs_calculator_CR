import {OutlinedInput, InputAdornment, FormLabel, IconButton} from '@material-ui/core'
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
            <FormLabel component="legend">{label}</FormLabel>
            <IconButton onClick={decrement}>
                <RemoveCircleIcon/>
            </IconButton>
            <OutlinedInput
            id="outlined-adornment"
            value={averageUnitsMonth}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">U</InputAdornment>}
            type="number"
            className="numberInput"
          /> 
          <IconButton onClick={increment}>
                <AddCircleIcon/>
            </IconButton>      
        </div>
    )
}
