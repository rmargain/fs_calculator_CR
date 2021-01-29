import React from "react";
import { Switch, Route } from "react-router-dom";
import CalculatorContainer from "./containers/calculator/CalculatorView"
import Instructions from "./containers/instructions/Instructions"

const Routes = () => (
  <Switch>
    <Route exact path="/" component={CalculatorContainer} />
    <Route exact path="/instrucciones" component={Instructions} />
    
  </Switch>
);

export default Routes;