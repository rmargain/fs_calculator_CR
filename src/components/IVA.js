import {FormControl, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core'


export default function Iva({setIva, iva}) {

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Aplica IVA para el producto</FormLabel>
                    <RadioGroup aria-label="IVA" name="IVA" value={iva} onChange={(e) => setIva(e.target.value)}>
                        <FormControlLabel  value='Si' control={<Radio />} label="Sí" />
                        <FormControlLabel  value='No' control={<Radio />} label="No" />
                    </RadioGroup>
            </FormControl>
        </div>
    )
}

