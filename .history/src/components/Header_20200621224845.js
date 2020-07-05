import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Top from "../components/Top"
import TopRight from "../components/TopRight"
import BOT1 from './BOT1';
import companyLogo from "../assets/companyLogo.svg"
import { SvgIcon } from '@material-ui/core';

const header = () => {
    const styles={
        appbar: {margin:"-1rem"},
        bgstyle: {elevation: "0"},
        title: {fontSize: "1.5rem",margin:"0.5rem"},
        top: {textAlign: "center",marginLeft:"25%"},
        topright: {textAlign: "center",marginLeft:"auto", borderRadius: "20px", padding:"4px"}

    }
   return (
    <div>
        <AppBar position="static"  style={styles.appbar} elevation={0} >
      <Toolbar>
        <IconButton edge="start" >
          <SvgIcon path d={"../assets/companyLogo.svg"}></SvgIcon>
        
        </IconButton>
        <Typography variant="h6" color="inherit">
          <h1 style={styles.title}>ABC PRODUCTS</h1>
        </Typography>
        <div style={styles.top}>
        <Top />

        </div>
        <div style={styles.topright}>
        <BOT1 />

        </div>
      </Toolbar>
    </AppBar>
      
   
  </div>
   );
}
export default header;
