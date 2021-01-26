import React, {useContext, useState, useEffect} from 'react'
import {ventasMes, ivaAplicable, isrAplicable, comisionCR, pasarelaPagos, fsThreshold, envioPromedio, totalEnviosActual} from '../../utils/calculations'

export default function CurrentStoreStatus({
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

    const [precio, setPrecio] = useState(0)
    // Modelo Actual
    const venta = averageUnitsOrder * currentProductPrice
    const envio = moto/100*69 + auto/100*99 + national/100 *141
    const ventaTotal = venta + envio
    const comisionCR = subscription === "Standard" ? ventaTotal * 0.1 : ventaTotal * 0.05
    const pagos = ventaTotal * 0.035
    const costoEnvioGratisActual = 0
    const ivaActual = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? 0 : ivaAplicable(iva, fiscalStatus, rfcStatus)*venta/1.16
    const isrActual = ivaAplicable(iva, fiscalStatus, rfcStatus) === 0 ? isrAplicable(fiscalStatus, rfcStatus)*venta : isrAplicable(fiscalStatus, rfcStatus)*venta/1.16
    const percepcionActual = venta - comisionCR - pagos - ivaActual - isrActual - costoEnvioGratisActual
    const costoTotalActual = costs * averageUnitsOrder
    const gananciaNetaActual = percepcionActual - costoTotalActual
    const gananciaNetaPorUnidadActual = gananciaNetaActual / averageUnitsOrder

    // Modelo Envio Gratis
    const min = 499
    const porcentajeEnvioGratis = currentProductPrice >= min ? 1 : 0.7
    const unidadesEnvioGratis = averageUnitsMonth * porcentajeEnvioGratis
    const unidadesMinimasRequeridas = currentProductPrice >= min ? 1 : min/currentProductPrice
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
    
        // optimizacion
    // function optimizedPrice(gananciaNetaPorUnidadActual){
       
    let price = 119
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
    
    // while (gananciaNetaPorUnidadActual - _gananciaNetaPorUnidadEnvioGratis > 1){
    //     price += 1
    // }
    // console.log(precio)
    // return 15
    // }
    return (
        <div>
           <div>Unidades: {averageUnitsOrder}</div> 
           <div>Precio: {currentProductPrice}</div> 
           <div>Venta: {venta}</div> 
           <div>Envío: {envio}</div> 
           <div>Venta Total: {ventaTotal}</div> 
           <div>Comision CR: {comisionCR}</div> 
           <div>Pagos: {pagos}</div> 
           <div>Costo Envío Gratis: {costoEnvioGratisActual}</div> 
           <div>Iva: {ivaActual}</div> 
           <div>ISR: {isrActual}</div> 
           <div>Percepción por Venta: {percepcionActual}</div> 
           <div>Costo del Producto: {costoTotalActual}</div>
           <div>Ganancia Neta: {gananciaNetaActual}</div>
           <div>Ganancia Neta por Unidad: {gananciaNetaPorUnidadActual}</div>
           <br/>
           <br/>
           <br/>
           <div>Unidades: {unidadesEnvioGratisPorOrden}</div> 
           <div>Precio: {currentProductPrice}</div> 
           <div>Venta: {ventaTotalEnvioGratis}</div> 
           <div>Envío: {envioPagadoPorCliente}</div> 
           <div>Venta Total: {ventaTotalEnvioGratis}</div> 
           <div>Comision CR: {comisionCREnvioGratis}</div> 
           <div>Pagos: {pagosEnvioGratis}</div> 
           <div>Costo Envío Gratis: {costoEnvioGratis}</div> 
           <div>Iva: {ivaEnvioGratis}</div> 
           <div>ISR: {isrEnvioGratis}</div> 
           <div>Percepción por Venta: {percepcionEnvioGratis}</div> 
           <div>Costo del Producto: {costoTotalEnvioGratis}</div>
           <div>Ganancia Neta: {gananciaNetaEnvioGratis}</div>
           <div>Ganancia Neta por Unidad: {gananciaNetaPorUnidadEnvioGratis}</div>
           <br/>
           <br/>
           <br/>
           <div>Unidades: {_unidadesEnvioGratisPorOrden}</div> 
           <div>Precio: {price}</div> 
           <div>Venta: {_ventaTotalEnvioGratis}</div> 
           <div>Envío: {_envioPagadoPorCliente}</div> 
           <div>Venta Total: {_ventaTotalEnvioGratis}</div> 
           <div>Comision CR: {_comisionCREnvioGratis}</div> 
           <div>Pagos: {_pagosEnvioGratis}</div> 
           <div>Costo Envío Gratis: {_costoEnvioGratis}</div> 
           <div>Iva: {_ivaEnvioGratis}</div> 
           <div>ISR: {_isrEnvioGratis}</div> 
           <div>Percepción por Venta: {_percepcionEnvioGratis}</div> 
           <div>Costo del Producto: {_costoTotalEnvioGratis}</div>
           <div>Ganancia Neta: {_gananciaNetaEnvioGratis}</div>
           <div>Ganancia Neta por Unidad: {_gananciaNetaPorUnidadEnvioGratis}</div> 
           <div>{_gananciaNetaPorUnidadEnvioGratis}</div>
           {/* <div>{optimizedPrice(gananciaNetaPorUnidadActual)}</div> */}


        </div>
    )
}
