import {OutlinedInput, InputAdornment, FormLabel, IconButton, Card} from '@material-ui/core'
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
         <Card variant="outlined" style={{padding:"5px", margin: "10px"}}>
            <FormLabel component="legend">Precio actual del producto</FormLabel>
            <div style={{display:"flex"}}>
            <OutlinedInput
            id="outlined-adornment"
            value={currentProductPrice}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            className="numberInput"
          /> 
          <div style={{display: "flex", flexDirection: "column", margin: 0, padding: 0, size: "15%"}}>
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
