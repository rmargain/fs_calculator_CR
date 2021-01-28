import React, { useContext, useState, useEffect } from "react";
import { ivaAplicable, isrAplicable } from "../../utils/calculations";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Box,
  Collapse,
  IconButton,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { withStyles, makeStyles } from "@material-ui/core/styles";

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
  const venta = Math.round(averageUnitsOrder * currentProductPrice * 100) / 100;
  const envio =
    averageUnitsOrder === 0
      ? 0
      : Math.round(
          ((moto / 100) * 69 + (auto / 100) * 99 + (national / 100) * 141) * 100
        ) / 100;
  const ventaTotal = Math.round((venta + envio) * 100) / 100;
  const comisionCR =
    subscription === "Standard"
      ? Math.round(ventaTotal * 0.1 * 100) / 100
      : Math.round(ventaTotal * 0.05 * 100) / 100;
  const pagos = Math.round(ventaTotal * 0.035 * 100) / 100;
  const costoEnvioGratisActual = 0;
  const ivaActual =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? 0
      : Math.round(
          ((ivaAplicable(iva, fiscalStatus, rfcStatus) * venta) / 1.16) * 100
        ) / 100;
  const isrActual =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? Math.round(isrAplicable(fiscalStatus, rfcStatus) * venta * 100) / 100
      : Math.round(
          ((isrAplicable(fiscalStatus, rfcStatus) * venta) / 1.16) * 100
        ) / 100;
  const percepcionActual =
    Math.round(
      (venta -
        comisionCR -
        pagos -
        ivaActual -
        isrActual -
        costoEnvioGratisActual) *
        100
    ) / 100;
  const costoTotalActual = Math.round(costs * averageUnitsOrder * 100) / 100;
  const gananciaNetaActual =
    Math.round((percepcionActual - costoTotalActual) * 100) / 100;
  const gananciaNetaPorUnidadActual =
    Math.round((gananciaNetaActual / averageUnitsOrder) * 100) / 100;

  // Modelo Envio Gratis
  // Envio Gratis
  const min = 499;
  const porcentajeEnvioGratis =
    currentProductPrice >= min
      ? 1
      : currentProductPrice * averageUnitsOrder >= min
      ? 1
      : 0.7;
  const unidadesEnvioGratis =
    Math.round(averageUnitsMonth * porcentajeEnvioGratis * 100) / 100;
  const unidadesMinimasRequeridas = Math.max(
    currentProductPrice >= min ? 1 : Math.ceil(min / currentProductPrice),
    averageUnitsOrder
  );
  const ordenesEnvioGratis = Math.floor(
    unidadesEnvioGratis / unidadesMinimasRequeridas
  );
  const unidadesEnvioGratisPorOrden = unidadesEnvioGratis / ordenesEnvioGratis;
  const ventaEnvioGratis = unidadesEnvioGratisPorOrden * currentProductPrice;
  const envioPagadoPorCliente = 0;
  const ventaTotalEnvioGratis = ventaEnvioGratis + envioPagadoPorCliente;
  const comisionCREnvioGratis =
    subscription === "Standard"
      ? ventaTotalEnvioGratis * 0.1
      : ventaTotalEnvioGratis * 0.05;
  const pagosEnvioGratis = 0.035 * ventaTotalEnvioGratis;
  const costoEnvioGratis = envio;
  const ivaEnvioGratis =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? 0
      : (ivaAplicable(iva, fiscalStatus, rfcStatus) * ventaTotalEnvioGratis) /
        1.16;
  const isrEnvioGratis =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? isrAplicable(fiscalStatus, rfcStatus) * ventaTotalEnvioGratis
      : (isrAplicable(fiscalStatus, rfcStatus) * ventaTotalEnvioGratis) / 1.16;
  const percepcionEnvioGratis =
    ventaTotalEnvioGratis -
    comisionCREnvioGratis -
    pagosEnvioGratis -
    ivaEnvioGratis -
    isrEnvioGratis -
    costoEnvioGratis;
  const costoTotalEnvioGratis = costs * unidadesEnvioGratisPorOrden;
  const gananciaNetaEnvioGratis = percepcionEnvioGratis - costoTotalEnvioGratis;
  const gananciaNetaPorUnidadEnvioGratis =
    gananciaNetaEnvioGratis / unidadesEnvioGratisPorOrden;
  //Envio Pagado
  const porcentajeEnvioPagado =
    currentProductPrice >= min
      ? 0
      : currentProductPrice * averageUnitsOrder >= min
      ? 0
      : 0.3;
  const unidadesEnvioPagado = averageUnitsMonth * porcentajeEnvioPagado;
  // const _unidadesEnvioPagado = price >= min ? 1 : Math.ceil(min/price)
  const ordenesEnvioPagado =
    unidadesEnvioPagado === 0
      ? 0
      : Math.floor(unidadesEnvioPagado / averageUnitsOrder);
  const unidadesEnvioPagadoPorOrden =
    ordenesEnvioPagado === 0 ? 0 : unidadesEnvioPagado / ordenesEnvioPagado;
  const ventaEnvioPagado = unidadesEnvioPagadoPorOrden * currentProductPrice;
  const envioPagadoPorCliente2 = unidadesEnvioPagado === 0 ? 0 : envio;
  const ventaTotalEnvioPagado = ventaEnvioPagado + envioPagadoPorCliente2;
  const comisionCREnvioPagado =
    subscription === "Standard"
      ? ventaTotalEnvioPagado * 0.1
      : ventaTotalEnvioPagado * 0.05;
  const pagosEnvioPagado = 0.035 * ventaTotalEnvioPagado;
  const costoEnvioGratis2 = 0;
  const ivaEnvioPagado =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? 0
      : (ivaAplicable(iva, fiscalStatus, rfcStatus) * ventaEnvioPagado) / 1.16;
  const isrEnvioPagado =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? isrAplicable(fiscalStatus, rfcStatus) * ventaEnvioPagado
      : (isrAplicable(fiscalStatus, rfcStatus) * ventaEnvioPagado) / 1.16;
  const percepcionEnvioPagado =
    ventaEnvioPagado -
    comisionCREnvioPagado -
    pagosEnvioPagado -
    ivaEnvioPagado -
    isrEnvioPagado;
  const costoTotalEnvioPagado = costs * unidadesEnvioPagadoPorOrden;
  const gananciaNetaEnvioPagado = percepcionEnvioPagado - costoTotalEnvioPagado;
  const gananciaNetaPorUnidadEnvioPagado =
    unidadesEnvioPagadoPorOrden === 0
      ? 0
      : gananciaNetaEnvioPagado / unidadesEnvioPagadoPorOrden;
  const gananciaNetaPromedioPonderadoPorUnidad =
    currentProductPrice >= min
      ? gananciaNetaPorUnidadEnvioGratis
      : currentProductPrice * averageUnitsOrder >= min
      ? gananciaNetaPorUnidadEnvioGratis
      : gananciaNetaPorUnidadEnvioGratis * 0.7 +
        gananciaNetaPorUnidadEnvioPagado * 0.3;

  // optimizacion
  function optimizedPrice(
    gananciaNetaPorUnidadActual,
    min,
    averageUnitsMonth,
    averageUnitsOrder
  ) {
    let price = 10;
    while (price < 1.3 * currentProductPrice) {
      // constantes envio gratis
      const _porcentajeEnvioGratis =
        price >= min ? 1 : price * averageUnitsOrder >= min ? 1 : 0.7;
      const _unidadesEnvioGratis = averageUnitsMonth * _porcentajeEnvioGratis;
      const _unidadesMinimasRequeridas =
        price >= min ? 1 : Math.ceil(min / price);
      const _ordenesEnvioGratis = Math.floor(
        _unidadesEnvioGratis / _unidadesMinimasRequeridas
      );
      const _unidadesEnvioGratisPorOrden =
        _unidadesEnvioGratis / _ordenesEnvioGratis;
      const _ventaEnvioGratis = _unidadesEnvioGratisPorOrden * price;
      const _envioPagadoPorCliente = 0;
      const _ventaTotalEnvioGratis = _ventaEnvioGratis + _envioPagadoPorCliente;
      const _comisionCREnvioGratis =
        subscription === "Standard"
          ? _ventaTotalEnvioGratis * 0.1
          : _ventaTotalEnvioGratis * 0.05;
      const _pagosEnvioGratis = 0.035 * _ventaTotalEnvioGratis;
      const _costoEnvioGratis = envio;
      const _ivaEnvioGratis =
        ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
          ? 0
          : (ivaAplicable(iva, fiscalStatus, rfcStatus) *
              _ventaTotalEnvioGratis) /
            1.16;
      const _isrEnvioGratis =
        ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
          ? isrAplicable(fiscalStatus, rfcStatus) * _ventaTotalEnvioGratis
          : (isrAplicable(fiscalStatus, rfcStatus) * _ventaTotalEnvioGratis) /
            1.16;
      const _percepcionEnvioGratis =
        _ventaTotalEnvioGratis -
        _comisionCREnvioGratis -
        _pagosEnvioGratis -
        _ivaEnvioGratis -
        _isrEnvioGratis -
        _costoEnvioGratis;
      const _costoTotalEnvioGratis = costs * _unidadesEnvioGratisPorOrden;
      const _gananciaNetaEnvioGratis =
        _percepcionEnvioGratis - _costoTotalEnvioGratis;
      const _gananciaNetaPorUnidadEnvioGratis =
        _gananciaNetaEnvioGratis / _unidadesEnvioGratisPorOrden;

      // constantes envio pagado

      const _porcentajeEnvioPagado =
        price >= min ? 0 : price * averageUnitsOrder >= min ? 0 : 0.3;
      const _unidadesEnvioPagado = averageUnitsMonth * _porcentajeEnvioPagado;
      // const _unidadesEnvioPagado = price >= min ? 1 : Math.ceil(min/price)
      const _ordenesEnvioPagado = Math.floor(
        _unidadesEnvioPagado / averageUnitsOrder
      );
      const _unidadesEnvioPagadoPorOrden =
        _unidadesEnvioPagado / _ordenesEnvioPagado;
      const _ventaEnvioPagado = _unidadesEnvioPagadoPorOrden * price;
      const _envioPagadoPorCliente2 = _unidadesEnvioPagado === 0 ? 0 : envio;
      const _ventaTotalEnvioPagado =
        _ventaEnvioPagado + _envioPagadoPorCliente2;
      const _comisionCREnvioPagado =
        subscription === "Standard"
          ? _ventaTotalEnvioPagado * 0.1
          : _ventaTotalEnvioPagado * 0.05;
      const _pagosEnvioPagado = 0.035 * _ventaTotalEnvioPagado;
      const _costoEnvioGratis2 = 0;
      const _ivaEnvioPagado =
        ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
          ? 0
          : (ivaAplicable(iva, fiscalStatus, rfcStatus) * _ventaEnvioPagado) /
            1.16;
      const _isrEnvioPagado =
        ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
          ? isrAplicable(fiscalStatus, rfcStatus) * _ventaEnvioPagado
          : (isrAplicable(fiscalStatus, rfcStatus) * _ventaEnvioPagado) / 1.16;
      const _percepcionEnvioPagado =
        _ventaEnvioPagado -
        _comisionCREnvioPagado -
        _pagosEnvioPagado -
        _ivaEnvioPagado -
        _isrEnvioPagado;
      const _costoTotalEnvioPagado = costs * _unidadesEnvioPagadoPorOrden;
      const _gananciaNetaEnvioPagado =
        _percepcionEnvioPagado - _costoTotalEnvioPagado;
      const _gananciaNetaPorUnidadEnvioPagado =
        _gananciaNetaEnvioPagado / _unidadesEnvioPagadoPorOrden;
      const _gananciaNetaPromedioPonderadoPorUnidad =
        price >= min
          ? _gananciaNetaPorUnidadEnvioGratis
          : price * averageUnitsOrder <= min
          ? _gananciaNetaPorUnidadEnvioGratis
          : _gananciaNetaPorUnidadEnvioGratis * 0.7 +
            _gananciaNetaPorUnidadEnvioPagado * 0.3;

      let _diff = Math.abs(
        gananciaNetaPorUnidadActual - _gananciaNetaPromedioPonderadoPorUnidad
      );

      if (_diff < 0.01) {
        break;
      }
      price += 0.01;
    }
    return price;
  }

  // vista optimizacion
  const price = optimizedPrice(
    gananciaNetaPorUnidadActual,
    min,
    averageUnitsMonth,
    averageUnitsOrder
  );
  const _porcentajeEnvioGratis =
    price >= min ? 1 : price * averageUnitsOrder >= min ? 1 : 0.7;
  const _unidadesEnvioGratis = averageUnitsMonth * _porcentajeEnvioGratis;
  const _unidadesMinimasRequeridas = price >= min ? 1 : Math.ceil(min / price);
  const _ordenesEnvioGratis = Math.floor(
    _unidadesEnvioGratis / _unidadesMinimasRequeridas
  );
  const _unidadesEnvioGratisPorOrden =
    _unidadesEnvioGratis / _ordenesEnvioGratis;
  const _ventaEnvioGratis = _unidadesEnvioGratisPorOrden * price;
  const _envioPagadoPorCliente = 0;
  const _ventaTotalEnvioGratis = _ventaEnvioGratis + _envioPagadoPorCliente;
  const _comisionCREnvioGratis =
    subscription === "Standard"
      ? _ventaTotalEnvioGratis * 0.1
      : _ventaTotalEnvioGratis * 0.05;
  const _pagosEnvioGratis = 0.035 * _ventaTotalEnvioGratis;
  const _costoEnvioGratis = envio;
  const _ivaEnvioGratis =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? 0
      : (ivaAplicable(iva, fiscalStatus, rfcStatus) * _ventaTotalEnvioGratis) /
        1.16;
  const _isrEnvioGratis =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? isrAplicable(fiscalStatus, rfcStatus) * _ventaTotalEnvioGratis
      : (isrAplicable(fiscalStatus, rfcStatus) * _ventaTotalEnvioGratis) / 1.16;
  const _percepcionEnvioGratis =
    _ventaTotalEnvioGratis -
    _comisionCREnvioGratis -
    _pagosEnvioGratis -
    _ivaEnvioGratis -
    _isrEnvioGratis -
    _costoEnvioGratis;
  const _costoTotalEnvioGratis = costs * _unidadesEnvioGratisPorOrden;
  const _gananciaNetaEnvioGratis =
    _percepcionEnvioGratis - _costoTotalEnvioGratis;
  const _gananciaNetaPorUnidadEnvioGratis =
    _gananciaNetaEnvioGratis / _unidadesEnvioGratisPorOrden;
  // const _diff = Math.abs(gananciaNetaPorUnidadActual - _gananciaNetaPorUnidadEnvioGratis)

  const _porcentajeEnvioPagado = price >= min ? 0 : 0.3;
  const _unidadesEnvioPagado = averageUnitsMonth * _porcentajeEnvioPagado;
  // const _unidadesEnvioPagado = price >= min ? 1 : Math.ceil(min/price)
  const _ordenesEnvioPagado = Math.floor(
    _unidadesEnvioPagado / averageUnitsOrder
  );
  const _unidadesEnvioPagadoPorOrden =
    _unidadesEnvioPagado / _ordenesEnvioPagado;
  const _ventaEnvioPagado = _unidadesEnvioPagadoPorOrden * price;
  const _envioPagadoPorCliente2 = envio;
  const _ventaTotalEnvioPagado = _ventaEnvioPagado + _envioPagadoPorCliente2;
  const _comisionCREnvioPagado =
    subscription === "Standard"
      ? _ventaTotalEnvioPagado * 0.1
      : _ventaTotalEnvioPagado * 0.05;
  const _pagosEnvioPagado = 0.035 * _ventaTotalEnvioPagado;
  const _costoEnvioGratis2 = 0;
  const _ivaEnvioPagado =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? 0
      : (ivaAplicable(iva, fiscalStatus, rfcStatus) * _ventaEnvioPagado) / 1.16;
  const _isrEnvioPagado =
    ivaAplicable(iva, fiscalStatus, rfcStatus) === 0
      ? isrAplicable(fiscalStatus, rfcStatus) * _ventaEnvioPagado
      : (isrAplicable(fiscalStatus, rfcStatus) * _ventaEnvioPagado) / 1.16;
  const _percepcionEnvioPagado =
    _ventaEnvioPagado -
    _comisionCREnvioPagado -
    _pagosEnvioPagado -
    _ivaEnvioPagado -
    _isrEnvioPagado;
  const _costoTotalEnvioPagado = costs * _unidadesEnvioPagadoPorOrden;
  const _gananciaNetaEnvioPagado =
    _percepcionEnvioPagado - _costoTotalEnvioPagado;
  const _gananciaNetaPorUnidadEnvioPagado =
    _gananciaNetaEnvioPagado / _unidadesEnvioPagadoPorOrden;
  const _gananciaNetaPromedioPonderadoPorUnidad =
    price >= min
      ? _gananciaNetaPorUnidadEnvioGratis
      : _gananciaNetaPorUnidadEnvioGratis * 0.7 +
        _gananciaNetaPorUnidadEnvioPagado * 0.3;

  console.log(unidadesEnvioPagadoPorOrden);

  // table rows
  function createData(name, actual, envioGratis, envioPagado) {
    return { name, actual, envioGratis, envioPagado };
  }

  const rows = [
    createData(
      "Unidades",
      averageUnitsOrder.toFixed(2),
      unidadesEnvioGratisPorOrden.toFixed(2),
      unidadesEnvioPagadoPorOrden.toFixed(2)
    ),
    createData(
      "Precio",
      currentProductPrice.toFixed(2),
      currentProductPrice.toFixed(2),
      currentProductPrice.toFixed(2)
    ),
    createData(
      "Venta de Producto",
      venta.toFixed(2),
      ventaEnvioGratis.toFixed(2),
      ventaEnvioPagado.toFixed(2)
    ),
    createData(
      "Envío Pagado por Cliente",
      envio.toFixed(2),
      envioPagadoPorCliente.toFixed(2),
      envioPagadoPorCliente2.toFixed(2)
    ),
    createData(
      "Venta Total",
      ventaTotal.toFixed(2),
      ventaTotalEnvioGratis.toFixed(2),
      ventaTotalEnvioPagado.toFixed(2)
    ),
    createData(
      "Comisión CR",
      comisionCR.toFixed(2),
      comisionCREnvioGratis.toFixed(2),
      comisionCREnvioPagado.toFixed(2)
    ),
    createData(
      "Comisión Pagos",
      pagos.toFixed(2),
      pagosEnvioGratis.toFixed(2),
      pagosEnvioPagado.toFixed(2)
    ),
    createData(
      "Costo Envío Gratis",
      costoEnvioGratisActual.toFixed(2),
      costoEnvioGratis.toFixed(2),
      costoEnvioGratis2.toFixed(2)
    ),
    createData(
      "IVA",
      ivaActual.toFixed(2),
      ivaEnvioGratis.toFixed(2),
      ivaEnvioPagado.toFixed(2)
    ),
    createData(
      "ISR",
      isrActual.toFixed(2),
      isrEnvioGratis.toFixed(2),
      isrEnvioPagado.toFixed(2)
    ),
    createData(
      "Percepción por Venta",
      percepcionActual.toFixed(2),
      percepcionEnvioGratis.toFixed(2),
      percepcionEnvioPagado.toFixed(2)
    ),
    createData(
      "Costo del Producto",
      costoTotalActual.toFixed(2),
      costoTotalEnvioGratis.toFixed(2),
      costoTotalEnvioPagado.toFixed(2)
    ),
    createData(
      "Ganancia Neta",
      gananciaNetaActual.toFixed(2),
      gananciaNetaEnvioGratis.toFixed(2),
      gananciaNetaEnvioPagado.toFixed(2)
    ),
    createData(
      "Ganancia Neta por Unidad",
      gananciaNetaPorUnidadActual.toFixed(2),
      gananciaNetaPorUnidadEnvioGratis.toFixed(2),
      gananciaNetaPorUnidadEnvioPagado.toFixed(2)
    ),
    createData(
      "Ganancia Neta Ponderada",
      "",
      "",
      gananciaNetaPromedioPonderadoPorUnidad.toFixed(2)
    ),
    createData(
      "Comisiones y Retenciones",
      (comisionCR + pagos + ivaActual + isrActual).toFixed(2),
      (
        comisionCREnvioGratis +
        pagosEnvioGratis +
        ivaEnvioGratis +
        isrEnvioGratis
      ).toFixed(2),
      (
        comisionCREnvioPagado +
        pagosEnvioPagado +
        ivaEnvioPagado +
        isrEnvioPagado
      ).toFixed(2)
    ),
  ];

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  return (
    <div style={{ alignContent: "center", width: "100%" }}>
      <Card variant="outlined">
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Incremento en Precio: 0%</h3>
          <h3>
            Precio del Producto: ${Math.round(currentProductPrice * 100) / 100}
          </h3>
        </Paper>
      </Card>
      <Card style={{ alignContent: "center", overflow: "scroll" }}>
        <TableContainer component={Paper} style={{ padding: 0 }}>
          <Table className="table" aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="table-header-white"
                  style={{
                    backgroundColor: "white",
                    color: "white",
                    fontWeight: "bold",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                ></TableCell>
                <TableCell
                  className="table-header-white"
                  style={{
                    backgroundColor: "white",
                    color: "white",
                    fontWeight: "bold",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                ></TableCell>
                <TableCell
                  className="table-text"
                  align="center"
                  style={{
                    backgroundColor: "#BEBEBE",
                    fontWeight: "bold",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                >
                  Actual
                </TableCell>
                <TableCell
                  className="table-text"
                  colSpan={2}
                  align="center"
                  style={{
                    backgroundColor: "#E63976",
                    fontWeight: "bold",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                >
                  Simulación con Envío Gratis
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell
                  className="table-header-white"
                  style={{
                    backgroundColor: "white",
                    color: "white",
                    fontWeight: "bold",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                    witdh: `calc(90vw * 0.05)`,
                  }}
                ></TableCell>
                <TableCell
                  className="table-text"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                    width: `calc(90vw * 0.2)`,
                  }}
                >
                  Concepto
                </TableCell>
                <TableCell
                  className="table-text"
                  align="center"
                  style={{
                    backgroundColor: "#BEBEBE",
                    fontWeight: "bold",
                    width: `calc(90vw * 0.25)`,
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                >
                  Orden Actual
                </TableCell>
                <TableCell
                  className="table-text"
                  align="center"
                  style={{
                    backgroundColor: "#E63976",
                    fontWeight: "bold",
                    color: "white",
                    width: `calc(90vw * 0.25)`,
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                >
                  Orden Envío Gratis ({(porcentajeEnvioGratis * 100).toFixed(0)}
                  %)
                </TableCell>
                <TableCell
                  className="table-text"
                  align="center"
                  style={{
                    backgroundColor: "#E63976",
                    fontWeight: "bold",
                    color: "white",
                    width: `calc(90vw * 0.25)`,
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                >
                  Orden Envío Pagado (
                  {((1 - porcentajeEnvioGratis) * 100).toFixed(0)}%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  align="center"
                >
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    fontSize="small"
                    align="center"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (=) {rows[2].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",

                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  align="right"
                  className="table-cell-text"
                >
                  {rows[2].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",

                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  align="right"
                  className="table-cell-text"
                >
                  {rows[2].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",

                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  align="right"
                  className="table-cell-text"
                >
                  {rows[2].envioPagado}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={5}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Table
                      className="table-cell-text"
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              width: `calc(90vw * 0.1)`,
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          >
                            {"  "}
                          </TableCell>
                          <TableCell
                            className="table-cell-text"
                            style={{
                              width: `calc(90vw * 0.16)`,
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          >
                            (+) {rows[0].name}
                          </TableCell>
                          <TableCell
                            style={{
                              width: `calc(90vw * 0.24667)`,
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            align="right"
                            className="table-cell-text"
                          >
                            {rows[0].actual}
                          </TableCell>
                          <TableCell
                            style={{
                              width: `calc(90vw * 0.24667)`,
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            align="right"
                            className="table-cell-text"
                          >
                            {rows[0].envioGratis}
                          </TableCell>
                          <TableCell
                            style={{
                              width: `calc(90vw * 0.24667)`,
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            align="right"
                            className="table-cell-text"
                          >
                            {rows[0].envioPagado}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          ></TableCell>
                          <TableCell
                            className="table-cell-text"
                            style={{
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                          >
                            (X) {rows[1].name}
                          </TableCell>
                          <TableCell
                            className="table-cell-text"
                            style={{
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            align="right"
                          >
                            {rows[1].actual}
                          </TableCell>
                          <TableCell
                            className="table-cell-text"
                            style={{
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            align="right"
                          >
                            {rows[1].envioGratis}
                          </TableCell>
                          <TableCell
                            className="table-cell-text"
                            style={{
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            align="right"
                          >
                            {rows[1].envioPagado}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (+) {rows[3].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[3].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[3].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    width: "25%",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[3].envioPagado}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (=) {rows[4].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[4].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[4].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[4].envioPagado}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="center"
                >
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    fontSize="small"
                    align="center"
                    onClick={() => setOpen1(!open1)}
                  >
                    {open1 ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (-) {rows[15].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[15].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[15].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[15].envioPagado}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={5}>
                  <Collapse in={open1} timeout="auto" unmountOnExit>
                    <Table className="table-text" aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                              width: `calc(90vw * 0.1)`,
                            }}
                            className="table-cell-text"
                          ></TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                              width: `calc(90vw * 0.16)`,
                            }}
                            className="table-cell-text"
                          >
                            (-) {rows[5].name}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                              width: `calc(90vw * 0.24667)`,
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[5].actual}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                              width: `calc(90vw * 0.24667)`,
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[5].envioGratis}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                              width: `calc(90vw * 0.24667)`,
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[5].envioPagado}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          ></TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          >
                            (-) {rows[6].name}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[6].actual}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[6].envioGratis}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[6].envioPagado}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          ></TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          >
                            (-) {rows[8].name}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[8].actual}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[8].envioGratis}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[8].envioPagado}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          ></TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                          >
                            (-) {rows[9].name}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[9].actual}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[9].envioGratis}
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "white",
                              paddingRight: ".4vw",
                              paddingLeft: ".5vw",
                              paddingTop: ".1vw",
                              paddingBottom: ".1vw",
                            }}
                            className="table-cell-text"
                            align="right"
                          >
                            {rows[9].envioPagado}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (-) {rows[7].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[7].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[7].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[7].envioPagado}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (=) {rows[10].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[10].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[10].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#BEBEBE",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[10].envioPagado}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (-) {rows[11].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[11].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[11].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[11].envioPagado}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (=) {rows[12].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[12].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[12].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[12].envioPagado}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (=) {rows[13].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[13].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[13].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[13].envioPagado}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                ></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                >
                  (=) {rows[14].name}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[14].actual}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[14].envioGratis}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    paddingRight: ".4vw",
                    paddingLeft: ".5vw",
                    paddingTop: ".1vw",
                    paddingBottom: ".1vw",
                  }}
                  className="table-cell-text"
                  align="right"
                >
                  {rows[14].envioPagado}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );

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
