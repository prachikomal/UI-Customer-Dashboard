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
import BOT from :..


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
       <BOT/>
      
   
  </div>
   );
}
export default navbar;
