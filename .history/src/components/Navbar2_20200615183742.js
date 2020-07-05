import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Centerlogo from "../components/Centerlogo"
import Rightlogo from "../components/Rightlogo"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
const history = useHistory();

  const routeChange = () =>{ 
    let path = `newPath`; 
    history.push(path);

const navbar = () => {
    const styles={
        appbar: {margin:"-1rem"},
        bgstyle: {elevation: "0"},
        title: {fontSize: "1.5rem",margin:"0.5rem"},
        center: {textAlign: "center",marginLeft:"25%"},
        right: {textAlign: "center",marginLeft:"auto", borderRadius: "20px", padding:"4px"},
        
    }

    
   return (
    <div>
        <AppBar position="static"  style={styles.appbar} elevation={0} >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ArrowBackIcon />
        
        </IconButton>
        <div >
        <Typography variant="h6" color="inherit">
          <p style={styles.title} edge="start">Nucleus</p>
             1796567
        </Typography>
        </div>
        <div style={styles.center}>
        <Centerlogo />

        </div>
        <div style={styles.right}>
        <Button
 variant="primary"
 type="button"
 //onClick={this.whatever}
>

<img alt="timer" src={require('../assets/FredaButton.png')} />
</Button>

        </div>
      </Toolbar>
    </AppBar>
      
   
  </div>
   );
}
export default navbar;
