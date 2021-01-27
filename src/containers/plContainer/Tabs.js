import React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Scenarios(props) {
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
        <h1>Paso 1: Ingresa los datos de tu tienda y producto</h1>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Datos de la Tienda</Typography>
        </AccordionSummary>
        <AccordionDetails className="input-container" >
            <StoreSubscription setSubscription = {setSubscription} subscription = {subscription}/>
            <FiscalStatus setFiscalStatus = {setFiscalStatus} fiscalStatus = {fiscalStatus}/>
            <RfcStatus setRfcStatus = {setRfcStatus} rfcStatus={rfcStatus}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Datos del Producto</Typography>
        </AccordionSummary>
        <AccordionDetails className="input-container" >
            <Iva setIva = {setIva} iva = {iva}/>
            <CurrProductPrice setCurrentProductPrice = {setCurrentProductPrice} currentProductPrice = {currentProductPrice}/>
            <Costs setCosts = {setCosts} costs = {costs}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Datos de Órdenes</Typography>
        </AccordionSummary>
        <AccordionDetails className="input-container" >
          <AverageUnitsOrder setAverageUnitsOrder = {setAverageUnitsOrder} averageUnitsOrder={averageUnitsOrder} label="Unidades promedio por Orden (Actual)"/>
            <AvgUnitsMonth setAverageUnitsMonth = {setAverageUnitsMonth} averageUnitsMonth = {averageUnitsMonth} label="Unidades promedio vendidas al mes"/>
            <ShipmentsDist setMoto = {setMoto} moto = {moto} setAuto = {setAuto} auto = {auto} setNational= {setNational} national = {national}/>
        </AccordionDetails>
      </Accordion>
        </div>
    )
}