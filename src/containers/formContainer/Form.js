import React, { useContext } from 'react'
import StoreSubscription from '../../components/StoreSubscription';
import FiscalStatus from '../../components/FiscalStatus';
import RfcStatus from '../../components/RfcStatus';
import CurrProductPrice from '../../components/CurrentProductPrice';
import Costs from '../../components/Costs';
import AverageUnitsOrder from '../../components/AverageUnitsOrder';
import AvgUnitsMonth from '../../components/AverageUnitsMonth';
import ShipmentsDist from '../../components/ShipmentsDist';
import { Button } from '@material-ui/core';
import Iva from '../../components/IVA';


export default function Form(props) {
    const {
        setSubscription, subscription,
        setFiscalStatus, fiscalStatus,
        setRfcStatus, rfcStatus,
        setIva, iva,
        setCurrentProductPrice, currentProductPrice,
        setCosts, costs, 
        setAverageUnitsOrder, averageUnitsOrder,
        setAverageUnitsMonth, averageUnitsMonth,
        setMoto, moto,
        setAuto, auto, 
        setNational, national
    } = props

    function handleSubmit(){
        console.log(props)
    }

    return (
        <div>
            <StoreSubscription setSubscription = {setSubscription} subscription = {subscription}/>
            <FiscalStatus setFiscalStatus = {setFiscalStatus} fiscalStatus = {fiscalStatus}/>
            <RfcStatus setRfcStatus = {setRfcStatus} rfcStatus={rfcStatus}/>
            <Iva setIva = {setIva} iva = {iva}/>
            <CurrProductPrice setCurrentProductPrice = {setCurrentProductPrice} currentProductPrice = {currentProductPrice}/>
            <Costs setCosts = {setCosts} costs = {costs}/>
            <AverageUnitsOrder setAverageUnitsOrder = {setAverageUnitsOrder} averageUnitsOrder={averageUnitsOrder} label="Unidades promedio por Orden (Actual)"/>
            <AvgUnitsMonth setAverageUnitsMonth = {setAverageUnitsMonth} averageUnitsMonth = {averageUnitsMonth} label="Unidades promedio vendidas al mes"/>
            <ShipmentsDist setMoto = {setMoto} moto = {moto} setAuto = {setAuto} auto = {auto} setNational= {setNational} national = {national}/>
            <Button onClick={handleSubmit}>Dale</Button>
        </div>
    )
}
