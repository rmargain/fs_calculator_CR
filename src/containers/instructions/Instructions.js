import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const Instructions = () => {
    return (
      <div style={{ margin: "2em" }}>
        <h1>Funcionamiento e Instrucciones de Uso</h1>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 style={{ color: "#E63976" }}>
              Objetivo de la Calculadora de Envíos GRATIS
            </h3>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>
              El objetivo de la calculadora es ayudar a las tiendas de Canasta
              Rosa a determinar el precio de sus productos con el fin de
              participar en el programa de Envíos GRATIS.
            </p>
            <p>
              Es responsabilidad de cada una de las tiendas de Canasta Rosa
              determinar y publicar los precios de sus productos. Tanto la
              calculadora como las recomendaciones de Canasta Rosa, deberán
              considerarse como apoyo en la definición de los precios de
              productos, sin embargo el precio publicado de los productos lo
              deberá determinar la tienda oferente.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 style={{ color: "#E63976" }}>Funcionamiento</h3>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>
              La calculadora es un simulador financiero que compara el estado
              actual con el estado esperado si la tienda ofreciera envíos
              gratis. En escencia, simulamos cómo se ve una orden de un producto
              hoy (sin ofrecer envíos gratis) y la comparamos con cómo se vería
              una órden ofreciendo envíos gratis. Comparando el estado actual
              con el estado esperado con envíos gratis habilitados, podemos
              determinar el impacto económico en una órden y determinar el
              incremento en precio del producto requerido para absorber el costo
              del envio.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 style={{ color: "#E63976" }}>
              Consideraciones Importantes y Recomendaciones
            </h3>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h4 style={{ color: "#E63976" }}>Granularidad</h4>
            <p>
              La calculadora fue desarrollada para estimar precios a nivel de
              producto. Es importante no agregar múltiples productos en una
              misma simulación.
            </p>
            <h4 style={{ color: "#E63976" }}>Supuestos</h4>
            <p>
              Si bien el modelo toma datos reales (ingresados por la tienda),
              tambien cuenta con dos supuestos que iremos refinando conforme
              tengamos mayor información del comportamiento de los compradores.
            </p>
            <p>
              <b>Supuesto 1:</b> Para productos con precio menor a $499,
              consideramos que 70% de las unidades vendidas serán vendidas bajo
              el esquema de Envío Gratis y 30% de las unidades serán vendidas
              bajo el esquema actual (cliente paga el envío).
            </p>
            <p>
              ¿Cómo afecta esto los resultados? -- UNICAMENTE PARA PRODUCTOS CON
              PRECIO MAYOR O IGUAL A $499
            </p>
            <p>
              Si las unidades vendidas bajo el esquema de envío gratis resultan
              ser menores al 70%, la tienda se verá beneficiada (generará
              mayores ganancias). En el caso contrario (unidades vendidas bajo
              el esquema de envíos gratis supera EL 70%), la tienda se verá
              afectada (generará menores ganancias).
            </p>
            <p>
              <b>Supuesto 2:</b> El modelo es conservador al momento de simular
              la órden con envío gratis. Considera que las órdenes de envío
              gratis incluyen las unidades mínimas necesarias para cumplir con
              el límite establecido de $499.{" "}
            </p>
            <p>¿Cómo afecta esto los resultados? </p>
            <p>
              En las órdenes con envio gratis que contengan un número de
              unidades mayor al mínimo requerido, la tienda se estaría viendo
              beneficiada. En este caso recomendamos a la tienda reconsiderar el
              precio de sus productos a la baja para incrementar la demanda.
            </p>
            <h4 style={{ color: "#E63976" }}>
              Casos en que la calculadora no puede dar una recomendación
            </h4>
            <h4>
              {" "}
              Posibles razones por las que no podemos darte una recomendación
            </h4>
            <ul>
              <li>El precio del producto ingresado es muy bajo.</li>
              <li>
                La diferencia entre el precio del producto y el costo no es
                suficiente para cubrir las deducciones actuales.
              </li>
              <li>
                El número de unidades mensuales actuales combinado con el precio
                del producto no es suficiente para cubrir el mínimo de $499 para
                envíos gratis en el futuro.
              </li>
            </ul>
            <h4>
              ¿Cómo lo resuelvo? - PENSEMOS EN GRANDE Y MODELEMOS UN CASO
              TEÓRICO
            </h4>
            <ul>
              <li>
                Ajusta el costo: Asegurate de que el precio del producto y el
                costo de materia prima y producción esten correctos (recuerda
                que todo tiene que ser por unidad).
              </li>
              <li>
                Ajusta Unidades por orden promedio: Ingresa el número de
                unidades equivalente a $300 (aproximadamente).
              </li>
              <li>
                Ajusta Unidades promedio vendidas al mes: Ingresa 100 unidades
                (recuerda: es un caso teórico y simularemos cómo se ven esas
                mismas 100 unidades ofreciendo o no envíos gratis).
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 style={{ color: "#E63976" }}>Instrucciones</h3>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h4 style={{ color: "#E63976" }}>
              Paso 1: Ingresar Datos Requeridos
            </h4>
            <p>
              El modelo requiere de 9 datos de entrada para realizar los
              cálculos correspondientes
            </p>
            <p>
              <b>Tipo de Suscripción:</b> Deberás ingresar el tipo de
              suscripción en Canasta Rosa (Standard o Plus). Recomendamos
              suscribirte a PLUS para gozar de una comisión más baja.
            </p>
            <p>
              <b>Tipo de Registro Fiscal:</b> Deberás ingresar el tipo de
              registro fiscal que tienes dado de alta en Canasta Rosa (Persona
              Física o Persona Moral)
            </p>
            <p>
              <b>RFC Registrado en Canasta Rosa:</b> Deberás indicar si tienes o
              no tu RFC dado de alta en Canasta Rosa. En caso de que no lo
              tengas dado de alta, te recomendamos ingresarlo para disminuir que
              Canasta Rosa esta obligado a retener y reportar al SAT.
            </p>
            <p>
              <b>IVA para el producto:</b> Deberás indicar si tu producto grava
              IVA o no.
            </p>
            <p>
              <b>Precio Actual del Producto:</b> Deberás ingresar el precio
              actual del producto a analizar
            </p>
            <p>
              <b>Costo del producto (Materia prima + costo de producción):</b>{" "}
              El costo del producto es una variable opcional. El modelo no es
              sensible al costo del producto, sin embardo ayuda a tener
              visibilidad sobre las ganancias de la tienda.
            </p>
            <p>
              <b>Unidades por órden promedio:</b> Deberás ingresar el número de
              unidades del producto que contiene una órden "típica" o promedio.
              IMPORTANTE: NO AGREGUES MÚLTIPLES PRODUCTOS EN UNA ÓRDEN. La
              simulación funciona para un solo producto.
            </p>
            <p>
              <b>Unidades vendidas en promedio al mes:</b> Deberás ingresar el
              número de unidades del producto analizado que vendes al mes en
              Canasta Rosa
            </p>
            <p>
              <b>Distribución de Envíos:</b> Deberás de indicar el porcentaje de
              las órdenes que se envía por cada una de las opciones disponibles
              (Express Moto, Express Auto y Nacional). Podrás seleccionar el
              porcentaje deslizando los puntos en la barra para obtener los
              valores deseados. Para las tiendas que únicamente ofrecen envío
              express, el punto de la derecha deberá estar al 100% (indicando
              que envíos nacionales es 0%).
            </p>
            <h4 style={{ color: "#E63976" }}>
              Paso 2: Evaluación de Escenarios y Determinación del Precio del
              Producto
            </h4>
            <p>
              Presentamos 2 escenarios fijos y 1 escenario dinámico en donde la
              tienda podrá simular el traslado del 0% al 100% del costo
              incremental incurrido por participar en el progama de Envíos
              Gratis.{" "}
            </p>
            <p>
              <b>Interpretación</b>
            </p>
            <p>
              En todos los escenarios podrás visualizar información financiera
              comparando el estado actual (cómo se ve una orden actualmente) con
              el el caso en dónde la tienda ofrece envíos gratis.
            </p>
            <p>
              <b>Venta Mensual Actual:</b> Representa la Venta de Producto
              Actual de manera mensual de la tienda. (Unidades promedio vendidas
              al mes * Precio actual del prodcuto)
            </p>
            <p>
              <b>Ganancia Mensual Actual:</b> Representa la ganancia mensual de
              la tienda por la venda del producto analizado. Esto equivale a lo
              que Canasta Rosa estaría pagando a los vendedores a lo largo del
              mes despues de hacer todas las deducciones correspondientes
              (comisiones, IVA, ISR).{" "}
            </p>
            <p>
              <b>Incremento en Precio:</b> Representa el incremento en precio
              simulado en el escenario que estima los datos financieros de las
              órdenes con envío gratis.
            </p>
            <p>
              <b>Precio del Producto:</b> Representa el nuevo precio del
              producto con el cual sería publicado para envíos gratis.
            </p>
            <p>
              <b>Venta Requerida para Igualar Ganancia:</b> Representa la venta
              en $MXN que requeriría realizar la tienda bajo el modelo de envíos
              gratis para igualar la ganancia actual. Este campo también indica
              el porcentaje de ventas incrementales requeridas para igualar la
              ganancia mensual actual.
            </p>
            <p>
              <b>Unidades Requeridas para Igualar Ganancia:</b> Representa las
              unidades que requeriría vender la tienda bajo el modelo de envíos
              gratis para igualar la ganancia actual. Este campo también indica
              el porcentaje de unidades incrementales requeridas para igualar la
              ganancia mensual actual.
            </p>
            <p>
              <b>Tabla comparativa:</b> En la tabla comparativa podrás ver el
              desglose de los conceptos de cada una de las órdenes. Así mismo en
              los encabezados de la simulación de envíos gratis podrás notar el
              porcentaje de unidades que se estarían vendiendo por medio de
              envío gratis y el pocentaje que se estaría vendiendo por envio
              pagado por el cliente.
            </p>
            <p></p>
            <p></p>
            <p></p>
            <p>
              <b>Escenario 1: Sin Incrementar Precios</b>
            </p>
            <p>
              Durante los meses de Septiembre, Octubre y Noviembre del 2020,
              Canasta Rosa corrió una serie de pruebas piloto en donde ofrecimos
              envíos gratis a los compradores. Los resultados fueron favorables
              y observamos un crecimiento en ventas de 69% y una disminución de
              carritos abandonados de 16pp (puntos porcentiales).
            </p>
            <p>
              Este escenario es el más parecido a las pruebas piloto que
              realizamos, ya que las tiendas no afectaron sus precios durante
              este periodo.
            </p>
            <p>
              <b>Escenario 2: Recomendación CR</b>
            </p>
            <p>
              El escenario 3 representa lo que en nuestra perspectiva es un buen
              balance entre incrementar precios e incrementar ventas a raiz de
              ofrecer envíos gratis.
            </p>
            <p>
              Recomendamos trasladar el 55% del costo incremental incurrido por
              ofrecer envios gratis al costo del producto.
            </p>
            <p>
              <b>Escenario 3: Tu decide</b>
            </p>
            <p>
              En este escenario la tienda podrá modelar el porcentaje del costo
              incremental incurrido a trasladar al precio del producto.
            </p>
            <p>Este escenario ayuda a contestar preguntas como:</p>
            <p>
              ¿Cuál tendría que ser el precio de mi producto para que con 25% de
              incremento en unidades pueda igualar mi ganancia actual?
            </p>
            <p>
              ¿Cuánto más tendría que generar en ventas para igualar mi ganancia
              actual si incremento el precio en 5%, 10%, 15%?
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 style={{ color: "#E63976" }}>
              ¡Ajusta tus precios y activa Envios GRATIS!
            </h3>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>
              Regresa al dashboard de tu tienda para ajustar los precios de tus
              productos y activar envíos GRATIS.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    );
}

export default Instructions
