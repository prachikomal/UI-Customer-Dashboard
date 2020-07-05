
import React, { Component } from 'react';
import theme, { pxToVh } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import { callDummyAPI } from '../services/services';
import  Navbar from "../components/Navbar";

import Paper from '@material-ui/core/Paper';
import Sec1 from "../components/Sec1";
import Sec2 from "../components/Sec2";
import Ltop from "../components/Ltop";

import SearchIcon from '@material-ui/icons/Search';
//import Searchbar from '../components/Searchbar';
import Table2 from '../components/Table2';
import Analytic from '../components/Bar1';
import  Users from '../components/Users';
import axios from "axios";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  textStyle1: {
    color: '#FFFFFFA6',
    fontSize: '2.5vw',
    marginTop: '2vh',
  },
  textStyle2: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  textfield: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  nameInput: {
    fontSize: '1vw',
    color: '#FFFFFF',
  },
  notchedOutline: { borderWidth: '1px', borderColor: '#5DAAE0 !important' },
  searchBtn: {
    marginTop: '8vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
  
  searchBtnDisabled: {
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
  
    alignSelf: 'center',
    color: 'white !important',
    background: '#FFFFFFa5',
    '&:hover': {
      cursor: 'default',
      backgroundColor: '#FFFFFFa5',
    },
  },
  
  
  });

class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      response: 0,
      redirect: false,
      loading: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleGetStarted = (e) => {
    callDummyAPI(this.state.name).then((response) => {
      // });
      this.setState({
        response: response.data.name,
        redirect: true,
        loading: false,
      });
    });
  };
  totalCustomer=() =>{
    axios.get('http://localhost:8080/1706431/totalcustomer')
    .then((res) => {console.log(res.data);this.setState({ totalCustomer : res.data})}
  ).catch(e => console.log(e))
  }
   
  totalop=() =>{
    axios.get('http://localhost:8080/1706431/totalopenar')
    .then((res) => {console.log(res.data);this.setState({ totalop : res.data})}
  ).catch(e => console.log(e))
  
  }
  
  
  avgday=() =>{
    axios.get('http://localhost:8080/1706431/avgdaydelay')
    .then((res) => {console.log(res.data);this.setState({ avgday : res.data})}
  ).catch(e => console.log(e))
  }
  
  openinvoice=() =>{
    axios.get('http://localhost:8080/1706431/totalopeninvoice')
    .then((res) => {console.log(res.data);this.setState({ openinvoice : res.data})}
  ).catch(e => console.log(e))
  }
  componentWillMount()
{
this.totalCustomer()
this.totalop()
this.avgday()
this.openinvoice()
}
   
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item  xs={12}>
          <Paper className={classes.paper}><Navbar/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Sec1 heading="Total Customer" id="tc" autoid="total-customers-text-collector" value={this.state.totalCustomer}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Sec1 heading="Total Open AR"  id="tr" autoid="total-open-ar-text-collector" value={this.state.totalop}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Sec1 heading="Average Days Delay" id="av" autoid="average-days-delay-text-collector" value={this.state.avgday}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Sec1 heading="Total open invoice" id="ti" autoid=" total-open-invoice-text-collector"value={this.state.openinvoice}/></Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper
        className={classes.paper}
        style={{backgroundColor:'#1B1F38', height: 200, marginLeft: 10}}
      >
        <Analytic/>
      </Paper>
      <Paper
        className={classes.paper}
        style={{ height: 180, marginLeft: 8, marginTop:10}}
      >
        <Table2/>
      </Paper>
          </Grid>
          <Grid item xs={8} >
          <Paper  className={classes.paper} ><Users /></Paper>
        </Grid>
        
        
        <Footer/>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CollectorDashboard);
