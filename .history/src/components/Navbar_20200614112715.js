import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Centerlogo from "../components/Centerlogo"
import Rightlogo from "../components/Rightlogo"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const navbar = () => {
    const styles={
        appbar: {margin:"-1rem"},
        bgstyle: {elevation: "0"},
        title: {fontSize: "1.5rem",margin:"0.5rem"},
        center: {textAlign: "center",marginLeft:"25%"},
        right: {textAlign: "center",marginLeft:"auto", borderRadius: "20px", padding:"4px"}

    }
   return (
    <div>
        <AppBar position="static"  style={styles.appbar} elevation={0} >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ArrowBackIcon />
        
        </IconButton>
        <Typography variant="h6" color="inherit">
          <h3 style={styles.title}>Walmart</h3>
          <h4>17965
        </Typography>
        <div style={styles.center}>
        <Centerlogo />

        </div>
        <div style={styles.right}>
        <Rightlogo/>

        </div>
      </Toolbar>
    </AppBar>
      
   
  </div>
   );
}
export default navbar;
