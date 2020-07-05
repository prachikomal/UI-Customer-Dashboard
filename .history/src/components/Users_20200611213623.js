import React, { Component } from 'react';
import axios from "../components/axios.js";
import Table from '@material-ui/core/Table';  
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';    

import TableHead from '@material-ui/core/TableHead';  

import TableRow from '@material-ui/core/TableRow';  

import Paper from '@material-ui/core/Paper'; 
import PropTypes from 'prop-types';

const styles = (theme) => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
    },
});

export  class Users extends Component {
     constructor(props) {
        super(props);
        this.state = {
            Users: []
            
        };
    }

      
    getUsersData() {
        
        axios
            .get(`/users`, {})
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
        

        return (
            <Paper style={styles.paper}>

        <Table>  

          <TableHead>  

            <TableRow>  

              <TableCell>Account Header ID</TableCell>  
              <TableCell>Company ID</TableCell>  
              <TableCell>Document Number</TableCell> 
              <TableCell>Business Code</TableCell>  
              <TableCell>create_year</TableCell> 
              <TableCell>document_line_number</TableCell> 
              <TableCell>doctype</TableCell> 
              <TableCell>customer_number</TableCell> 
              <TableCell>customer_number_norm</TableCell> 
              <TableCell>fk_customer_map_id</TableCell> 
              <TableCell>customer_name</TableCell> 
              <TableCell>division</TableCell> 
              <TableCell>document_create_date</TableCell> 
              <TableCell>document_create_date_norm</TableCell> 
              <TableCell>posting_date</TableCell> 
              <TableCell>posting_date_norm</TableCell> 
              <TableCell>posting_id</TableCell> 
              <TableCell>due_date</TableCell> 
              <TableCell>due_date_norm</TableCell> 
              
              

              
              

            </TableRow>  

          </TableHead>  

          <TableBody>  

            {  

              this.state.Users.map((p, index) => {  

                return <TableRow key={index}>  

                  <TableCell component="th" scope="row">  

                    {p.Id}  

                  </TableCell>  
                
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

              })  

            }  

          </TableBody>  

        </Table>  

      </Paper>

    );  

  
        }
    }
    
  

export default Users; 
        

