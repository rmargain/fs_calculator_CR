import {FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Card} from '@material-ui/core'
import MouseOverPopover from './Popover'

export default function RfcStatus({setRfcStatus, rfcStatus}) {

    return (
        <div>
        <Card variant="outlined" style={{padding:"5px", margin: "10px"}}>
            <FormControl component="fieldset">
                <FormLabel component="legend">RFC registrado en CR</FormLabel>
                    <RadioGroup aria-label="RFC registrado" name="rfcStatus" value={rfcStatus} onChange={(e) => setRfcStatus(e.target.value)}>
                        <FormControlLabel  value="Si" control={<Radio />} label="Sí" />
                        <MouseOverPopover value="No" label="No" text="Te recomendamos ingresar tu RFC a CR para disminuir la retención de IVA/ISR"/>
                    </RadioGroup>
            </FormControl>
        </Card>
        </div>
    )
}


