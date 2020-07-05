import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CollectorDashboard2 from '../src/views/CollectorDashboard2';
import CustomerDetails from '../src/views/CustomerDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ROLL_NUMBER} from '../src/utils/constants';
import theme from '../src/utils/theme';
import BOT from "../"


const styles = (theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  mainBackground: {
    background: theme.palette.primary.main,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
});
class App extends Component  {
  render() {
    console.log('theme', theme);
    const { classes, user } = this.props;
    return (
      // <MuiThemeProvider theme={theme}>
      <div className={classes.mainBackground}>
        
        
        <BOT/>
      </div> 
      
    );
  
}
}
export default withStyles(styles, { withTheme: true })(App);
