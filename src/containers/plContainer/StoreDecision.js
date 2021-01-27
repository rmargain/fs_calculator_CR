import React, {useContext, useState, useEffect} from 'react'
import {ivaAplicable, isrAplicable} from '../../utils/calculations'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Typography, Slider} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';

export default function StoreDecision({
        subscription,
        fiscalStatus,
        rfcStatus,
        iva,
        currentProductPrice,
        costs,
        averageUnitsOrder,
        averageUnitsMonth,
        moto,
        auto,
        national,
}) {

    
    // Modelo Actual
    const venta = Math.round(averageUnitsOrder * currentProductPrice*100)/100
    const envio = averageUnitsOrder === 0 ? 0 : Math.round((moto/100*69 + auto/100*99 + national/100 *141)*100)/100
    const ventaTotal = Math.round((venta + envio)*100)/100
    const comisionCR = subscription === "Standard" ? Math.round(ventaTotal * 0.1*100)/100 : Math.round(ventaTotal * 0.05*100)/100
    const pagos = Math.round(ventaTotal * 0.035*100)/100
    const costoEnvioGratisActual = 0
    const ivaActual = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : Math.round(ivaAplicable(iva, fiscalStatus, rfcStatus)*venta/1.16*100)/100
    const isrActual = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? Math.round(isrAplicable(fiscalStatus, rfcStatus)*venta*100)/100 : Math.round(isrAplicable(fiscalStatus, rfcStatus)*venta/1.16*100)/100
    const percepcionActual = Math.round((venta - comisionCR - pagos - ivaActual - isrActual - costoEnvioGratisActual)*100)/100
    const costoTotalActual = Math.round(costs * averageUnitsOrder*100)/100
    const gananciaNetaActual = Math.round((percepcionActual - costoTotalActual)*100)/100
    const gananciaNetaPorUnidadActual = Math.round(gananciaNetaActual / averageUnitsOrder*100)/100

    // Modelo Envio Gratis
     // Envio Gratis
    const min = 499
    const porcentajeEnvioGratis = currentProductPrice >= min ? 1 : 0.7
    const unidadesEnvioGratis = Math.round(averageUnitsMonth * porcentajeEnvioGratis *100)/100
    const unidadesMinimasRequeridas = currentProductPrice >= min ? 1 : Math.round(min/currentProductPrice*100)/100
    const ordenesEnvioGratis = Math.floor(unidadesEnvioGratis/unidadesMinimasRequeridas)
    const unidadesEnvioGratisPorOrden = unidadesEnvioGratis/ordenesEnvioGratis
    const ventaEnvioGratis = unidadesEnvioGratisPorOrden * currentProductPrice
    const envioPagadoPorCliente = 0
    const ventaTotalEnvioGratis = ventaEnvioGratis + envioPagadoPorCliente
    const comisionCREnvioGratis = subscription === "Standard" ? ventaTotalEnvioGratis * 0.1 : ventaTotalEnvioGratis * 0.05
    const pagosEnvioGratis = 0.035 * ventaTotalEnvioGratis
    const costoEnvioGratis = envio
    const ivaEnvioGratis = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*ventaTotalEnvioGratis/1.16
    const isrEnvioGratis = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*ventaTotalEnvioGratis : isrAplicable(fiscalStatus, rfcStatus)*ventaTotalEnvioGratis/1.16
    const percepcionEnvioGratis = ventaTotalEnvioGratis - comisionCREnvioGratis - pagosEnvioGratis - ivaEnvioGratis - isrEnvioGratis - costoEnvioGratis
    const costoTotalEnvioGratis = costs * unidadesEnvioGratisPorOrden
    const gananciaNetaEnvioGratis = percepcionEnvioGratis - costoTotalEnvioGratis
    const gananciaNetaPorUnidadEnvioGratis = gananciaNetaEnvioGratis/unidadesEnvioGratisPorOrden
      //Envio Pagado
    const porcentajeEnvioPagado = currentProductPrice >= min ? 0 : 0.3
    const unidadesEnvioPagado = averageUnitsMonth * porcentajeEnvioPagado
    // const _unidadesEnvioPagado = price >= min ? 1 : Math.ceil(min/price)
    const ordenesEnvioPagado = Math.floor(unidadesEnvioPagado/averageUnitsOrder)
    const unidadesEnvioPagadoPorOrden = unidadesEnvioPagado/ordenesEnvioPagado
    const ventaEnvioPagado = unidadesEnvioPagadoPorOrden * currentProductPrice
    const envioPagadoPorCliente2 = unidadesEnvioPagado === 0 ? 0 : envio
    const ventaTotalEnvioPagado = ventaEnvioPagado + envioPagadoPorCliente2
    const comisionCREnvioPagado = subscription === "Standard" ? ventaTotalEnvioPagado * 0.1 : ventaTotalEnvioPagado * 0.05
    const pagosEnvioPagado = 0.035 * ventaTotalEnvioPagado
    const costoEnvioGratis2 = 0
    const ivaEnvioPagado = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*ventaEnvioPagado/1.16
    const isrEnvioPagado = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*ventaEnvioPagado : isrAplicable(fiscalStatus, rfcStatus)*ventaEnvioPagado/1.16
    const percepcionEnvioPagado = ventaEnvioPagado - comisionCREnvioPagado - pagosEnvioPagado - ivaEnvioPagado - isrEnvioPagado
    const costoTotalEnvioPagado = costs * unidadesEnvioPagadoPorOrden
    const gananciaNetaEnvioPagado = percepcionEnvioPagado - costoTotalEnvioPagado
    const gananciaNetaPorUnidadEnvioPagado = gananciaNetaEnvioPagado/unidadesEnvioPagadoPorOrden
    const gananciaNetaPromedioPonderadoPorUnidad = currentProductPrice >= min ? gananciaNetaPorUnidadEnvioGratis : gananciaNetaPorUnidadEnvioGratis * 0.7 + gananciaNetaPorUnidadEnvioPagado * 0.3
    

        // optimizacion
    function optimizedPrice(gananciaNetaPorUnidadActual, min, averageUnitsMonth, averageUnitsOrder){
       
    let price = 10
    while (price < 1.3*currentProductPrice){
    // constantes envio gratis    
    const _porcentajeEnvioGratis = price >= min ? 1 : 0.7
    const _unidadesEnvioGratis = averageUnitsMonth * _porcentajeEnvioGratis
    const _unidadesMinimasRequeridas = price >= min ? 1 : Math.ceil(min/price)
    const _ordenesEnvioGratis = Math.floor(_unidadesEnvioGratis/_unidadesMinimasRequeridas)
    const _unidadesEnvioGratisPorOrden = _unidadesEnvioGratis/_ordenesEnvioGratis
    const _ventaEnvioGratis = _unidadesEnvioGratisPorOrden * price
    const _envioPagadoPorCliente = 0
    const _ventaTotalEnvioGratis = _ventaEnvioGratis + _envioPagadoPorCliente
    const _comisionCREnvioGratis = subscription === "Standard" ? _ventaTotalEnvioGratis * 0.1 : _ventaTotalEnvioGratis * 0.05
    const _pagosEnvioGratis = 0.035 * _ventaTotalEnvioGratis
    const _costoEnvioGratis = envio
    const _ivaEnvioGratis = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*_ventaTotalEnvioGratis/1.16
    const _isrEnvioGratis = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*_ventaTotalEnvioGratis : isrAplicable(fiscalStatus, rfcStatus)*_ventaTotalEnvioGratis/1.16
    const _percepcionEnvioGratis = _ventaTotalEnvioGratis - _comisionCREnvioGratis - _pagosEnvioGratis - _ivaEnvioGratis - _isrEnvioGratis - _costoEnvioGratis
    const _costoTotalEnvioGratis = costs * _unidadesEnvioGratisPorOrden
    const _gananciaNetaEnvioGratis = _percepcionEnvioGratis - _costoTotalEnvioGratis
    const _gananciaNetaPorUnidadEnvioGratis = _gananciaNetaEnvioGratis/_unidadesEnvioGratisPorOrden

    // constantes envio pagado
    
    const _porcentajeEnvioPagado = price >= min ? 0 : 0.3
    const _unidadesEnvioPagado = averageUnitsMonth * _porcentajeEnvioPagado
    // const _unidadesEnvioPagado = price >= min ? 1 : Math.ceil(min/price)
    const _ordenesEnvioPagado = Math.floor(_unidadesEnvioPagado/averageUnitsOrder)
    const _unidadesEnvioPagadoPorOrden = _unidadesEnvioPagado/_ordenesEnvioPagado
    const _ventaEnvioPagado = _unidadesEnvioPagadoPorOrden * price
    const _envioPagadoPorCliente2 = _unidadesEnvioPagado === 0 ? 0 : envio
    const _ventaTotalEnvioPagado = _ventaEnvioPagado + _envioPagadoPorCliente2
    const _comisionCREnvioPagado = subscription === "Standard" ? _ventaTotalEnvioPagado * 0.1 : _ventaTotalEnvioPagado * 0.05
    const _pagosEnvioPagado = 0.035 * _ventaTotalEnvioPagado
    const _costoEnvioGratis2 = 0
    const _ivaEnvioPagado = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*_ventaEnvioPagado/1.16
    const _isrEnvioPagado = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*_ventaEnvioPagado : isrAplicable(fiscalStatus, rfcStatus)*_ventaEnvioPagado/1.16
    const _percepcionEnvioPagado = _ventaEnvioPagado - _comisionCREnvioPagado - _pagosEnvioPagado - _ivaEnvioPagado - _isrEnvioPagado
    const _costoTotalEnvioPagado = costs * _unidadesEnvioPagadoPorOrden
    const _gananciaNetaEnvioPagado = _percepcionEnvioPagado - _costoTotalEnvioPagado
    const _gananciaNetaPorUnidadEnvioPagado = _gananciaNetaEnvioPagado/_unidadesEnvioPagadoPorOrden
    const _gananciaNetaPromedioPonderadoPorUnidad = price >= min ? _gananciaNetaPorUnidadEnvioGratis : _gananciaNetaPorUnidadEnvioGratis * 0.7 + _gananciaNetaPorUnidadEnvioPagado * 0.3

    let _diff = Math.abs(gananciaNetaPorUnidadActual - _gananciaNetaPromedioPonderadoPorUnidad)
    
    if (_diff < .01){
        break;
    }
        price += .01
    }
    return price
    }

    const [increment, setIncrement] = useState(0)
    function handleChange(e, newValue){
      setIncrement(newValue)
    }

    // vista optimizacion
    const price = currentProductPrice + (optimizedPrice(gananciaNetaPorUnidadActual, min, averageUnitsMonth, averageUnitsOrder)-currentProductPrice) * increment/100
    const _porcentajeEnvioGratis = price >= min ? 1 : 0.7
    const _unidadesEnvioGratis = averageUnitsMonth * _porcentajeEnvioGratis
    const _unidadesMinimasRequeridas = price >= min ? 1 : Math.ceil(min/price)
    const _ordenesEnvioGratis = Math.floor(_unidadesEnvioGratis/_unidadesMinimasRequeridas)
    const _unidadesEnvioGratisPorOrden = _unidadesEnvioGratis/_ordenesEnvioGratis
    const _ventaEnvioGratis = _unidadesEnvioGratisPorOrden * price
    const _envioPagadoPorCliente = 0
    const _ventaTotalEnvioGratis = _ventaEnvioGratis + _envioPagadoPorCliente
    const _comisionCREnvioGratis = subscription === "Standard" ? _ventaTotalEnvioGratis * 0.1 : _ventaTotalEnvioGratis * 0.05
    const _pagosEnvioGratis = 0.035 * _ventaTotalEnvioGratis
    const _costoEnvioGratis = envio
    const _ivaEnvioGratis = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*_ventaTotalEnvioGratis/1.16
    const _isrEnvioGratis = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*_ventaTotalEnvioGratis : isrAplicable(fiscalStatus, rfcStatus)*_ventaTotalEnvioGratis/1.16
    const _percepcionEnvioGratis = _ventaTotalEnvioGratis - _comisionCREnvioGratis - _pagosEnvioGratis - _ivaEnvioGratis - _isrEnvioGratis - _costoEnvioGratis
    const _costoTotalEnvioGratis = costs * _unidadesEnvioGratisPorOrden
    const _gananciaNetaEnvioGratis = _percepcionEnvioGratis - _costoTotalEnvioGratis
    const _gananciaNetaPorUnidadEnvioGratis = _gananciaNetaEnvioGratis/_unidadesEnvioGratisPorOrden
    // const _diff = Math.abs(gananciaNetaPorUnidadActual - _gananciaNetaPorUnidadEnvioGratis)


    const _porcentajeEnvioPagado = price >= min ? 0 : 0.3
    const _unidadesEnvioPagado = averageUnitsMonth * _porcentajeEnvioPagado
    // const _unidadesEnvioPagado = price >= min ? 1 : Math.ceil(min/price)
    const _ordenesEnvioPagado = Math.floor(_unidadesEnvioPagado/averageUnitsOrder)
    const _unidadesEnvioPagadoPorOrden = _unidadesEnvioPagado/_ordenesEnvioPagado
    const _ventaEnvioPagado = _unidadesEnvioPagadoPorOrden * price
    const _envioPagadoPorCliente2 = envio
    const _ventaTotalEnvioPagado = _ventaEnvioPagado + _envioPagadoPorCliente2
    const _comisionCREnvioPagado = subscription === "Standard" ? _ventaTotalEnvioPagado * 0.1 : _ventaTotalEnvioPagado * 0.05
    const _pagosEnvioPagado = 0.035 * _ventaTotalEnvioPagado
    const _costoEnvioGratis2 = 0
    const _ivaEnvioPagado = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*_ventaEnvioPagado/1.16
    const _isrEnvioPagado = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*_ventaEnvioPagado : isrAplicable(fiscalStatus, rfcStatus)*_ventaEnvioPagado/1.16
    const _percepcionEnvioPagado = _ventaEnvioPagado - _comisionCREnvioPagado - _pagosEnvioPagado - _ivaEnvioPagado - _isrEnvioPagado
    const _costoTotalEnvioPagado = costs * _unidadesEnvioPagadoPorOrden
    const _gananciaNetaEnvioPagado = _percepcionEnvioPagado - _costoTotalEnvioPagado
    const _gananciaNetaPorUnidadEnvioPagado = _gananciaNetaEnvioPagado/_unidadesEnvioPagadoPorOrden
    const _gananciaNetaPromedioPonderadoPorUnidad = price >= min ? _gananciaNetaPorUnidadEnvioGratis : _gananciaNetaPorUnidadEnvioGratis * 0.7 + _gananciaNetaPorUnidadEnvioPagado * 0.3

    // table rows
    function createData(name, actual, envioGratis, envioPagado) {
        return {name, actual, envioGratis, envioPagado}
    }
    function valuetext(value) {
  return value;
}
    const rows = [
        createData('Unidades', averageUnitsOrder.toFixed(2), _unidadesEnvioGratisPorOrden.toFixed(2), _unidadesEnvioPagadoPorOrden.toFixed(2)),
        createData('Precio', currentProductPrice.toFixed(2), price.toFixed(2), price.toFixed(2)),
        createData('Venta de Producto', venta.toFixed(2), _ventaEnvioGratis.toFixed(2), _ventaEnvioPagado.toFixed(2)),
        createData('Envío', envio.toFixed(2), _envioPagadoPorCliente.toFixed(2), _envioPagadoPorCliente2.toFixed(2)),
        createData('Venta Total', ventaTotal.toFixed(2), _ventaTotalEnvioGratis.toFixed(2), _ventaTotalEnvioPagado.toFixed(2)),
        createData('Comisión CR', comisionCR.toFixed(2), _comisionCREnvioGratis.toFixed(2), _comisionCREnvioPagado.toFixed(2)),
        createData('Comisión Pagos', pagos.toFixed(2), _pagosEnvioGratis.toFixed(2), _pagosEnvioPagado.toFixed(2)),
        createData('Costo Envío Gratis', costoEnvioGratisActual.toFixed(2), _costoEnvioGratis.toFixed(2), _costoEnvioGratis2.toFixed(2)),
        createData('IVA', ivaActual.toFixed(2), _ivaEnvioGratis.toFixed(2), _ivaEnvioPagado.toFixed(2)),
        createData('ISR', isrActual.toFixed(2), _isrEnvioGratis.toFixed(2), _isrEnvioPagado.toFixed(2)),
        createData('Percepción por Venta', percepcionActual.toFixed(2), _percepcionEnvioGratis.toFixed(2), _percepcionEnvioPagado.toFixed(2)),
        createData('Costo del Producto', costoTotalActual.toFixed(2), _costoTotalEnvioGratis.toFixed(2), _costoTotalEnvioPagado.toFixed(2)),
        createData('Ganancia Neta', gananciaNetaActual.toFixed(2), _gananciaNetaEnvioGratis.toFixed(2), _gananciaNetaEnvioPagado.toFixed(2)),
        createData('Ganancia Neta por Unidad', gananciaNetaPorUnidadActual.toFixed(2), _gananciaNetaPorUnidadEnvioGratis.toFixed(2), _gananciaNetaPorUnidadEnvioPagado.toFixed(2)),
        createData('Ganancia Neta Ponderada', "", "", _gananciaNetaPromedioPonderadoPorUnidad.toFixed(2))
    ]

  

        return(
            <div style={{alignContent: 'center', display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
            <Card variant="outlined" style={{padding:"5px", margin: "10px", width: '50%', alignSelf: 'center'}}>

            <Typography id="discrete-slider-always" style={{marginBottom: '35px'}} gutterBottom>
  Porcentaje del costo de envío a trasladar a precio de producto
</Typography>
<Slider
  defaultValue={increment}
  getAriaValueText={valuetext}
  aria-labelledby="discrete-slider-always"
  step={1}
  valueLabelDisplay="on"
  onChange={handleChange}
  style={{width: '90%', margin: '15px'}}
/>
            </Card>
            <Card variant="outlined">
              <Paper elevation={3} style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                <h3>Incremento en Precio: {Math.round((price/currentProductPrice - 1)*100)}%</h3>
                <h3>Precio del Producto: {Math.round(price*100)/100}</h3>
              </Paper>
            </Card>
            <Card style={{padding: '20px', alignContent: 'center'}}>
            <TableContainer component={Paper}>
      <Table aria-label="customized table" style={{tableLayout: 'fixed'}}>
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontSize: '20px', paddingRight: 4, paddingLeft: 5}}>Concepto</TableCell>
            <TableCell align="right" style={{backgroundColor: '#BEBEBE', fontWeight: 'bold', fontSize: '20px', paddingRight: 4, paddingLeft: 5}}>Orden Actual</TableCell>
            <TableCell align="right" style={{backgroundColor: '#E63976', fontWeight: 'bold', fontSize: '20px', color: 'white', paddingRight: 4, paddingLeft: 5}}>Orden Envío Gratis ({(porcentajeEnvioGratis*100).toFixed(0)}%)</TableCell>
            <TableCell align="right" style={{backgroundColor: '#E63976', fontWeight: 'bold', fontSize: '20px', color: 'white', paddingRight: 4, paddingLeft: 5}}>Orden Envío Pagado ({((1-porcentajeEnvioGratis)*100).toFixed(0)}%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (+) {rows[0].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[0].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[0].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[0].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (X) {rows[1].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[1].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[1].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}align="right">{rows[1].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}}>
                (=) {rows[2].name}
              </TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[2].actual}</TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[2].envioGratis}</TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[2].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (+) {rows[3].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[3].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[3].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[3].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}}>
                (=) {rows[4].name}
              </TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[4].actual}</TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[4].envioGratis}</TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[4].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (-) {rows[5].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}align="right">{rows[5].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[5].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[5].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (-) {rows[6].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[6].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[6].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[6].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (-) {rows[7].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[7].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[7].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[7].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (-) {rows[8].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[8].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[8].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[8].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (-) {rows[9].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[9].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[9].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[9].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}}>
                (=) {rows[10].name}
              </TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[10].actual}</TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[10].envioGratis}</TableCell>
              <TableCell style={{backgroundColor: '#EBEBEB', fontSize: 16, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[10].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}}>
                (-) {rows[11].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[11].actual}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[11].envioGratis}</TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[11].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 20, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}}>
                (=) {rows[12].name}
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 20, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[12].actual}</TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 20, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[12].envioGratis}</TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 20, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[12].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} >
                (=) {rows[13].name}
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[13].actual}</TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[13].envioGratis}</TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[13].envioPagado}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell style={{backgroundColor: 'white', color: 'black', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} >
                (=) {rows[14].name}
              </TableCell>
              <TableCell style= {{paddingRight: 4, paddingLeft: 5}} align="right">{rows[14].actual}</TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[14].envioGratis}</TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontSize: 14, fontWeight: 'bold', paddingRight: 4, paddingLeft: 5}} align="right">{rows[14].envioPagado}</TableCell>
            </TableRow>

         
        </TableBody>
      </Table>
    </TableContainer>
            </Card>
            </div>
        )





    // return (
    //     <div>
    //        <div>Unidades: {averageUnitsOrder}</div> 
    //        <div>Precio: {currentProductPrice}</div> 
    //        <div>Venta: {venta}</div> 
    //        <div>Envío: {envio}</div> 
    //        <div>Venta Total: {ventaTotal}</div> 
    //        <div>Comision CR: {comisionCR}</div> 
    //        <div>Pagos: {pagos}</div> 
    //        <div>Costo Envío Gratis: {costoEnvioGratisActual}</div> 
    //        <div>Iva: {ivaActual}</div> 
    //        <div>ISR: {isrActual}</div> 
    //        <div>Percepción por Venta: {percepcionActual}</div> 
    //        <div>Costo del Producto: {costoTotalActual}</div>
    //        <div>Ganancia Neta: {gananciaNetaActual}</div>
    //        <div>Ganancia Neta por Unidad: {gananciaNetaPorUnidadActual}</div>
    //        <br/>
    //        <br/>
    //        <br/>
    //        <div>Unidades: {unidadesEnvioGratisPorOrden}</div> 
    //        <div>Precio: {currentProductPrice}</div> 
    //        <div>Venta: {ventaTotalEnvioGratis}</div> 
    //        <div>Envío: {envioPagadoPorCliente}</div> 
    //        <div>Venta Total: {ventaTotalEnvioGratis}</div> 
    //        <div>Comision CR: {comisionCREnvioGratis}</div> 
    //        <div>Pagos: {pagosEnvioGratis}</div> 
    //        <div>Costo Envío Gratis: {costoEnvioGratis}</div> 
    //        <div>Iva: {ivaEnvioGratis}</div> 
    //        <div>ISR: {isrEnvioGratis}</div> 
    //        <div>Percepción por Venta: {percepcionEnvioGratis}</div> 
    //        <div>Costo del Producto: {costoTotalEnvioGratis}</div>
    //        <div>Ganancia Neta: {gananciaNetaEnvioGratis}</div>
    //        <div>Ganancia Neta por Unidad: {gananciaNetaPorUnidadEnvioGratis}</div>
    //        <br/>
    //        <br/>
    //        <br/>
    //        <div>Unidades: {_unidadesEnvioGratisPorOrden}</div> 
    //        <div>Precio: {price}</div> 
    //        <div>Venta: {_ventaTotalEnvioGratis}</div> 
    //        <div>Envío: {_envioPagadoPorCliente}</div> 
    //        <div>Venta Total: {_ventaTotalEnvioGratis}</div> 
    //        <div>Comision CR: {_comisionCREnvioGratis}</div> 
    //        <div>Pagos: {_pagosEnvioGratis}</div> 
    //        <div>Costo Envío Gratis: {_costoEnvioGratis}</div> 
    //        <div>Iva: {_ivaEnvioGratis}</div> 
    //        <div>ISR: {_isrEnvioGratis}</div> 
    //        <div>Percepción por Venta: {_percepcionEnvioGratis}</div> 
    //        <div>Costo del Producto: {_costoTotalEnvioGratis}</div>
    //        <div>Ganancia Neta: {_gananciaNetaEnvioGratis}</div>
    //        <div>Ganancia Neta por Unidad: {_gananciaNetaPorUnidadEnvioGratis}</div> 
    //        <div>{_gananciaNetaPorUnidadEnvioGratis}</div>
    //        <br/>
    //        <br/>
    //        <br/>
    //        <div>Unidades: {_unidadesEnvioPagadoPorOrden}</div> 
    //        <div>Precio: {price}</div> 
    //        <div>Venta: {_ventaTotalEnvioPagado}</div> 
    //        <div>Envío: {_envioPagadoPorCliente2}</div> 
    //        <div>Venta Total: {_ventaTotalEnvioPagado}</div> 
    //        <div>Comision CR: {_comisionCREnvioPagado}</div> 
    //        <div>Pagos: {_pagosEnvioPagado}</div> 
    //        <div>Costo Envío Gratis: {_costoEnvioGratis2}</div> 
    //        <div>Iva: {_ivaEnvioPagado}</div> 
    //        <div>ISR: {_isrEnvioPagado}</div> 
    //        <div>Percepción por Venta: {_percepcionEnvioPagado}</div> 
    //        <div>Costo del Producto: {_costoTotalEnvioPagado}</div>
    //        <div>Ganancia Neta: {_gananciaNetaEnvioPagado}</div>
    //        <div>Ganancia Neta por Unidad: {_gananciaNetaPorUnidadEnvioPagado}</div> 
    //        <div>{_gananciaNetaPorUnidadEnvioPagado}</div>




    //        <div>{optimizedPrice(gananciaNetaPorUnidadActual, min, averageUnitsMonth, averageUnitsOrder)}</div>


        // </div>
    // )
}
