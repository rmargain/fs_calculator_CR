import {FormControl, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core'

export default function StoreSubscription({setSubscription, subscription}) {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de suscripción</FormLabel>
                    <RadioGroup aria-label="Tipo de Suscripción" value={subscription} name="subscription" onChange={(e) =>{
                            setSubscription(e.target.value)
                    }}>
                        <FormControlLabel  value="Standard" control={<Radio />} label="Standard" />
                        <FormControlLabel value="Plus" control={<Radio />} label="Plus" />
                    </RadioGroup>
            </FormControl>
        </div>
    )
}


