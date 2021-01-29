import { useState } from "react";
import Form from "../formContainer/Form";
import CurrentStoreStatus from "../plContainer/CurrentStoreStatus";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RecoCR from "../plContainer/RecoCR";
import StoreDecision from "../plContainer/StoreDecision";

const CalculatorView = () => {
  const [subscription, setSubscription] = useState("Standard");
  const [fiscalStatus, setFiscalStatus] = useState("Fisica");
  const [rfcStatus, setRfcStatus] = useState("Si");
  const [iva, setIva] = useState("Si");
  const [currentProductPrice, setCurrentProductPrice] = useState(100);
  const [costs, setCosts] = useState(0);
  const [averageUnitsOrder, setAverageUnitsOrder] = useState(4);
  const [averageUnitsMonth, setAverageUnitsMonth] = useState(40);
  const [moto, setMoto] = useState(33);
  const [auto, setAuto] = useState(33);
  const [national, setNational] = useState(34);

  // useEffect(() => {
  //   console.log(subscription);
  // }, [subscription]);

  return (
    <div>
      <div className="content">
        <Form
          setSubscription={setSubscription}
          subscription={subscription}
          setFiscalStatus={setFiscalStatus}
          fiscalStatus={fiscalStatus}
          setRfcStatus={setRfcStatus}
          rfcStatus={rfcStatus}
          setIva={setIva}
          iva={iva}
          setCurrentProductPrice={setCurrentProductPrice}
          currentProductPrice={currentProductPrice}
          setCosts={setCosts}
          costs={costs}
          setAverageUnitsOrder={setAverageUnitsOrder}
          averageUnitsOrder={averageUnitsOrder}
          setAverageUnitsMonth={setAverageUnitsMonth}
          averageUnitsMonth={averageUnitsMonth}
          setMoto={setMoto}
          moto={moto}
          setAuto={setAuto}
          auto={auto}
          setNational={setNational}
          national={national}
        />
        <br />
        <br />
        <h1>Paso 2: Evalua los Escenarios</h1>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Escenario 1: Sin Incremento de Precios</Typography>
          </AccordionSummary>
          <AccordionDetails className="input-container">
            <CurrentStoreStatus
              subscription={subscription}
              fiscalStatus={fiscalStatus}
              rfcStatus={rfcStatus}
              iva={iva}
              currentProductPrice={currentProductPrice}
              costs={costs}
              averageUnitsOrder={averageUnitsOrder}
              averageUnitsMonth={averageUnitsMonth}
              moto={moto}
              auto={auto}
              national={national}
              style={{ display: "flex", justifyContent: "" }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Escenario 2: Recomendación CR</Typography>
          </AccordionSummary>
          <AccordionDetails className="input-container">
            <RecoCR
              subscription={subscription}
              fiscalStatus={fiscalStatus}
              rfcStatus={rfcStatus}
              iva={iva}
              currentProductPrice={currentProductPrice}
              costs={costs}
              averageUnitsOrder={averageUnitsOrder}
              averageUnitsMonth={averageUnitsMonth}
              moto={moto}
              auto={auto}
              national={national}
              style={{ display: "flex", justifyContent: "" }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Escenario 3: Tu decide</Typography>
          </AccordionSummary>
          <AccordionDetails className="input-container">
            <StoreDecision
              subscription={subscription}
              fiscalStatus={fiscalStatus}
              rfcStatus={rfcStatus}
              iva={iva}
              currentProductPrice={currentProductPrice}
              costs={costs}
              averageUnitsOrder={averageUnitsOrder}
              averageUnitsMonth={averageUnitsMonth}
              moto={moto}
              auto={auto}
              national={national}
              style={{ display: "flex", justifyContent: "" }}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default CalculatorView;
