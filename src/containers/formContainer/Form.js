import StoreSubscription from "../../components/StoreSubscription";
import FiscalStatus from "../../components/FiscalStatus";
import RfcStatus from "../../components/RfcStatus";
import CurrProductPrice from "../../components/CurrentProductPrice";
import Costs from "../../components/Costs";
import AverageUnitsOrder from "../../components/AverageUnitsOrder";
import AvgUnitsMonth from "../../components/AverageUnitsMonth";
import ShipmentsDist from "../../components/ShipmentsDist";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import Iva from "../../components/IVA";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function Form(props) {
  const {
    setSubscription,
    subscription,
    setFiscalStatus,
    fiscalStatus,
    setRfcStatus,
    rfcStatus,
    setIva,
    iva,
    setCurrentProductPrice,
    currentProductPrice,
    setCosts,
    costs,
    setAverageUnitsOrder,
    averageUnitsOrder,
    setAverageUnitsMonth,
    averageUnitsMonth,
    setMoto,
    moto,
    setAuto,
    auto,
    setNational,
    national,
    setIserror,
    iserror,
  } = props;

  return (
    <div>
      <h1>Paso 1: Ingresa los datos de tu tienda y producto</h1>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Datos de la Tienda</Typography>
        </AccordionSummary>
        <AccordionDetails className="input-container">
          <StoreSubscription
            setSubscription={setSubscription}
            subscription={subscription}
            className="input-subcontainer"
          />
          <FiscalStatus
            setFiscalStatus={setFiscalStatus}
            fiscalStatus={fiscalStatus}
            className="input-subcontainer"
          />
          <RfcStatus
            setRfcStatus={setRfcStatus}
            rfcStatus={rfcStatus}
            className="input-subcontainer"
          />
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
        <AccordionDetails className="input-container">
          <Iva setIva={setIva} iva={iva} />
          <CurrProductPrice
            setCurrentProductPrice={setCurrentProductPrice}
            currentProductPrice={currentProductPrice}
          />
          <Costs setCosts={setCosts} costs={costs} />
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
        <AccordionDetails className="input-container">
          <AverageUnitsOrder
            setAverageUnitsOrder={setAverageUnitsOrder}
            averageUnitsOrder={averageUnitsOrder}
            setAverageUnitsMonth={setAverageUnitsMonth}
            averageUnitsMonth={averageUnitsMonth}
            setIserror={setIserror}
            iserror={iserror}
            label="Unidades promedio por Orden (Actual)"
          />
          <AvgUnitsMonth
            setAverageUnitsMonth={setAverageUnitsMonth}
            averageUnitsMonth={averageUnitsMonth}
            averageUnitsOrder={averageUnitsOrder}
            setIserror={setIserror}
            iserror={iserror}
            label="Unidades promedio vendidas al mes"
          />
          <ShipmentsDist
            setMoto={setMoto}
            moto={moto}
            setAuto={setAuto}
            auto={auto}
            setNational={setNational}
            national={national}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
