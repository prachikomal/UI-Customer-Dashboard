
import React, { Component } from 'react';
import axios from "axios";
import theme, { pxToVh } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import { callDummyAPI } from '../services/services';
import Header from "../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Blocks from "../components/Blocks";
//import Users from "../components/Users";
import Blocks2 from "../components/Blocks2";
//import ChartsPage from "../components/BarChart";
import Users from "../components/Users";
//import SearchTable from "../components/SearchTable";
//import SearchTable from "../components/SearchComponent";
//import CustomerSearch from "../components/CustomerSearch";
import Search from "../components/Search";
import {formatter} from '../utils/formatter';
import Analytic from "../components/Bar1";
import Table from "../components/Table";
import Insert from "../components/Insert";
import Lefttop from "../components/Lefttop";
import Leftbuttom from "../components/Leftbuttom";
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import navbar from '../components/navbar';
//import SearchComponent from '../components/SearchComponent';
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
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'blue',
    marginLeft: 0,
    width: '100%',
   
  },
  searchIcon: {
   
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnDisabled: {
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: 'white !important',
    background: '#FFFFFFa5',
    '&:hover': {
      cursor: 'default',
      backgroundColor: '#FFFFFFa5',
    },
  },
  topcircle:{
    borderRadius: "10px 10px 10px 10px",   
    
  },
  scroll:{
    width: '100%',
    marginTop: theme.spacing.unit * 1,
   
    overflowX: 'scroll',
    overflowY: 'scroll',
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
      openinvoice:null,
      totalCustomer:null,
      totalop:null,
      avgday:null,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }
   

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

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item  xs={12}>
          <Paper className={classes.paper}><Header/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Blocks styles={styles.topcircle}heading="Total Customer" id="tc"  value={this.state.totalCustomer}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Blocks styles={styles.topcircle}heading="Total Open AR" id="tr" value={this.state.totalop}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Blocks styles={styles.topcircle}heading="Average Days Delay" id="av" value={this.state.avgday}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Blocks styles={styles.topcircle}heading="Total open invoice" id="ti" value={this.state.openinvoice}/></Paper>
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
        <Search />
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


