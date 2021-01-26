import {OutlinedInput, InputAdornment, FormLabel, IconButton} from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function CurrProductPrice({setCurrentProductPrice, currentProductPrice}) {


    function handleChange({target: {value}}) {
        let valueToSet = parseFloat(value)
        setCurrentProductPrice(valueToSet)
    }

    function decrement(){
        setCurrentProductPrice(currentProductPrice-1)
    }
    function increment(){
        setCurrentProductPrice(currentProductPrice+1)
    }
    return (
        <div>
            <FormLabel component="legend">Precio Actual del Producto</FormLabel>
            <IconButton onClick={decrement}>
                <RemoveCircleIcon/>
            </IconButton>
            <OutlinedInput
            id="outlined-adornment"
            value={currentProductPrice}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            className="numberInput"
          /> 
          <IconButton onClick={increment}>
                <AddCircleIcon/>
            </IconButton>      
        </div>
    )
}
