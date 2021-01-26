import {FormControl, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core'


export default function FiscalStatus({setFiscalStatus, fiscalStatus}) {

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de registro fiscal en CR</FormLabel>
                    <RadioGroup aria-label="Tipo de Registro Fiscal" name="fiscalStatus" value={fiscalStatus} onChange={(e) => setFiscalStatus(e.target.value)}>
                        <FormControlLabel  value="Fisica" control={<Radio />} label="Persona Física" />
                        <FormControlLabel value="Moral" control={<Radio />} label="Persona Moral" />
                    </RadioGroup>
            </FormControl>
        </div>
    )
}


