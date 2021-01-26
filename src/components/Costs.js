import React, {useContext, useState} from 'react'
import {OutlinedInput, InputAdornment, FormLabel, IconButton} from '@material-ui/core'
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
        <div>
            <FormLabel component="legend">Costo (Materia Prima + Producción)</FormLabel>
            <IconButton onClick={decrement}>
                <RemoveCircleIcon/>
            </IconButton>
            <OutlinedInput
            id="outlined-adornment-amount"
            value={costs}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
          /> 
          <IconButton onClick={increment}>
                <AddCircleIcon/>
            </IconButton>      
        </div>
    )
}
