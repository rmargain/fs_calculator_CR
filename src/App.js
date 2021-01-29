import "./App.css";
import Navbar from "./components/Navbar";
import { StylesProvider } from "@material-ui/core/styles";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";

const App = () => {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </StylesProvider>
  );
};

const AppWithRouter = withRouter (App);

export default AppWithRouter;
