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

    
    // Modelo Actual
    const venta = averageUnitsOrder * currentProductPrice
    const envio = averageUnitsOrder === 0 ? 0 : moto/100*69 + auto/100*99 + national/100 *141
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
     // Envio Gratis
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
        console.log(price)
        break;
    }
        price += .01
    }
    return price
    }

    // vista optimizacion
    const price = optimizedPrice(gananciaNetaPorUnidadActual, min, averageUnitsMonth, averageUnitsOrder)
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
           <br/>
           <br/>
           <br/>
           <div>Unidades: {_unidadesEnvioPagadoPorOrden}</div> 
           <div>Precio: {price}</div> 
           <div>Venta: {_ventaTotalEnvioPagado}</div> 
           <div>Envío: {_envioPagadoPorCliente2}</div> 
           <div>Venta Total: {_ventaTotalEnvioPagado}</div> 
           <div>Comision CR: {_comisionCREnvioPagado}</div> 
           <div>Pagos: {_pagosEnvioPagado}</div> 
           <div>Costo Envío Gratis: {_costoEnvioGratis2}</div> 
           <div>Iva: {_ivaEnvioPagado}</div> 
           <div>ISR: {_isrEnvioPagado}</div> 
           <div>Percepción por Venta: {_percepcionEnvioPagado}</div> 
           <div>Costo del Producto: {_costoTotalEnvioPagado}</div>
           <div>Ganancia Neta: {_gananciaNetaEnvioPagado}</div>
           <div>Ganancia Neta por Unidad: {_gananciaNetaPorUnidadEnvioPagado}</div> 
           <div>{_gananciaNetaPorUnidadEnvioPagado}</div>




           <div>{optimizedPrice(gananciaNetaPorUnidadActual, min, averageUnitsMonth, averageUnitsOrder)}</div>


        </div>
    )
}
