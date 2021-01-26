import React from 'react'
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

export default function Navbar(props) {
    const {classes} = props
    return (
        <div>
            <AppBar position="static" className="navbar">
                <Toolbar className="toolbar">
                    <div className="logoContainer">
                        <img className="logo" src='https://canastarosa.com/scripts/components/Header2020/images/logo_horizontal.svg' alt='Logo Canasta Rosa'/>
                    </div>
                    
                    <Typography className="title">
                Calculadora Envío Gratis
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
