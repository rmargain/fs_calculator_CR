import {FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Card} from '@material-ui/core'


export default function Iva({setIva, iva}) {

    return (
        <div>
        <Card variant="outlined" style={{padding:"5px", margin: "10px"}}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Aplica IVA para el producto</FormLabel>
                    <RadioGroup aria-label="IVA" name="IVA" value={iva} onChange={(e) => setIva(e.target.value)}>
                        <FormControlLabel  value='Si' control={<Radio />} label="Sí" />
                        <FormControlLabel  value='No' control={<Radio />} label="No" />
                    </RadioGroup>
            </FormControl>
        </Card>
        </div>
    )
}


