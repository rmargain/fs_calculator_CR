import React, {useState} from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

export default function Navbar(props, params) {
  const { classes } = props;
 
  return (
    <div>
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <img
            className="logo"
            src="https://canastarosa.com/scripts/components/Header2020/images/logo_horizontal.svg"
            alt="Logo Canasta Rosa"
          />

          <div>
            <Typography className="title">Calculadora Envío Gratis</Typography>
          </div>

          <div>
            <Button className="inst-cont" color="inherit">
              {window.location.pathname === '/' ? <Link className="inst" to="/instrucciones">
                Instrucciones
              </Link> :
              <Link className="inst" to="/">
                Calculadora
              </Link>
              }
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
