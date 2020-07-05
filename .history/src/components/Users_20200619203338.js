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
import CheckBox from '@material-ui/core/Checkbox';
import theme from '../utils/theme';
const styles = (theme) => ({
  root: {
    width: '100%',
   
    height: '15vh',
    overflowY: 'scroll',
  },
  table: {
    overflowX: 'scroll',
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

          <TableHead  style={{ backgroundColor: '#282c34', color: 'white' }}>  

            <TableRow >  
            <TableCell padding='checkbox'>
                    <CheckBox
                      style={{ backgroundColor: '#252c59' }}
                      // onChange={ }#252c59
                    />
                  </TableCell>
           
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Account Header ID</TableCell>  
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Company ID</TableCell>  
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Document Number</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Business Code</TableCell>  
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Document Type</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Customer Number</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Customer Map ID</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Name Of Customer</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Document Create Date</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Baseline Date</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Invoice Date</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Invoice ID</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Total Open Amount</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Customer Payment Terms</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Clear Date</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Is Open Invoice</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Shipping Date</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Payment Amount</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Days Past Due Date</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Doc Id</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Actual Amount Outstanding</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Age of Invoice</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Invoice Currency</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Predicted Payment Type</TableCell> 
              <TableCell style={{ color: 'rgb(182, 182, 182)' }}>Predicted Amount</TableCell> 
              
              
              

              
              

            </TableRow>  

          </TableHead>  

          <TableBody>  
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(p => {  
            return (
            <TableRow style={{ backgroundColor: 'rgb(182, 182, 182)' }}>        

<TableCell padding='checkbox'>
                          <CheckBox align='right' />
                        </TableCell>
                
                <TableCell align="right">{p.acct_doc_header_id}</TableCell>  
                <TableCell align="right">{p.company_id}</TableCell>  
                <TableCell align="right">{p.document_number}</TableCell> 
                <TableCell align="right">{p.business_code}</TableCell> 

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
        <TablePagination  

        rowsPerPageOptions={[5, 10, 15,100]}  

        component="div"  

        count={data.length}  

        rowsPerPage={rowsPerPage}  
        page={page}  

        onChangePage={handleChangePage}  

       onChangeRowsPerPage={handleChangeRowsPerPage}  

      />  
      </Paper>

    );  

  
        
    }
    
  

         
      

