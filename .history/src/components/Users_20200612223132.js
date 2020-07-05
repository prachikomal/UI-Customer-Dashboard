import React, { Component } from 'react';

// import axios from "../components/axios.js";
import axios from 'axios';
import Table from '@material-ui/core/Table';  

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
/*import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';    

import TableHead from '@material-ui/core/TableHead';  

import TableRow from '@material-ui/core/TableRow';  */

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';


import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState, useEffect } from 'react'   

const styles = (theme) => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        
    },
    container: {  
      
          maxHeight: 440,  
      
        },  
});




export  default function Users() {
  const classes = styles();  

    const [page, setPage] = React.useState(0);  
  
    const [data, setData] = useState([]);   
  
    const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  
    useEffect(() => {    
  
          const GetData = async () => {    
  
            const result = await axios('http://localhost:8080/Summer_Internship_Backend/PopulateTable');    
  
            setData(result.data);    
  
          }  
  
          GetData();    
  
          console.log(data);  
  
  }, []);   
  const handleChangePage = (event, newPage) => {  
    
        setPage(newPage);  
    
      };  
      const handleChangeRowsPerPage = event => {  
        
            setRowsPerPage(+event.target.value);  
        
            setPage(0);  
        
          };  
        
          
    
      
      
      
  /*  getUsersData() {
        
        axios
            .get(`/PopulateTable`, {})
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({  
                    
             Users: res.data  
                
                          }); 

            })
            .catch((error) => {
                console.log(error)
            })

    }
    componentDidMount(){
        this.getUsersData()
        
    }
    render() {
        
        console.log(this.state.Users);  
        
*/
        return (
            <Paper style={styles.paper}>

        <Table>  

          <TableHead>  

            <TableRow>  
           
              <TableCell>Account Header ID</TableCell>  
              <TableCell>Company ID</TableCell>  
              <TableCell>Document Number</TableCell> 
              <TableCell>Business Code</TableCell>  
              <TableCell>Document Type</TableCell> 
              <TableCell>Customer Number</TableCell> 
              <TableCell>Customer Map ID</TableCell> 
              <TableCell>Name Of Customer</TableCell> 
              <TableCell>Document Create Date</TableCell> 
              <TableCell>Baseline Date</TableCell> 
              <TableCell>Invoice Date</TableCell> 
              <TableCell>Invoice ID</TableCell> 
              <TableCell>Total Open Amount</TableCell> 
              <TableCell>Customer Payment Terms</TableCell> 
              <TableCell>Clear Date</TableCell> 
              <TableCell>Is Open Invoice</TableCell> 
              <TableCell>Shipping Date</TableCell> 
              <TableCell>Payment Amount</TableCell> 
              <TableCell>Days Past Due Date</TableCell> 
              <TableCell>Doc Id</TableCell> 
              <TableCell>Actual Amount Outstanding</TableCell> 
              <TableCell>Age of Invoice</TableCell> 
              <TableCell>Invoice Currency</TableCell> 
              <TableCell>Predicted Payment Type</TableCell> 
              <TableCell>Predicted Amount</TableCell> 
              
              
              

              
              

            </TableRow>  

          </TableHead>  

          <TableBody>  
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(p => {  
            return (
            <TableRow>        

              
                
                  <TableCell align="right">{p.acct_doc_header_id}</TableCell>  
                <TableCell align="right">{p.company_id}</TableCell>  
                <TableCell align="right">{p.document_number}</TableCell>  
                <TableCell align="right">{p.doc_type}</TableCell>  
                <TableCell align="right">{p.customer_number}</TableCell>  
                <TableCell align="right">{p.fk_customer_map_id}</TableCell>  
                <TableCell align="right">{p.customer_name}</TableCell>  

                <TableCell align="right">{p.document_create_date}</TableCell>  
                <TableCell align="right">{p.baseline_create_date}</TableCell>  
                <TableCell align="right">{p.invoice_id}</TableCell>  
                <TableCell align="right">{p.total_open_amount}</TableCell>  
                <TableCell align="right">{p.cust_payment_terms}</TableCell>
                <TableCell align="right">{p.clearing_date}</TableCell>  
                <TableCell align="right">{p.isOpen}</TableCell>  
                <TableCell align="right">{p.ship_date}</TableCell>  
                <TableCell align="right">{p.paid_amount}</TableCell>  
                <TableCell align="right">{p.dayspast_due}</TableCell>  
                <TableCell align="right">{p.document_id}</TableCell>  
                  
                <TableCell align="right">{p.actual_open_amount}</TableCell>  
                <TableCell align="right">{p.invoice_age}</TableCell>  
                <TableCell align="right">{p.invoice_amount_doc_currency}</TableCell>  
                <TableCell align="right">{p.payment_method}</TableCell>  
                  </TableRow>
                    

                  

                
          );
              })  }

            

          </TableBody>  

        </Table>  

      </Paper>

    );  

  
        
    }
    
  

         
      

