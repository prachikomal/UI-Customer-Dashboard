import React, { Component } from 'react';
import axios from "../components/axios.js";
import Table from '@material-ui/core/Table';  

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';    

import TableHead from '@material-ui/core/TableHead';  

import TableRow from '@material-ui/core/TableRow';  

import Paper from '@material-ui/core/Paper'; 
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from 'prop-types';


const styles = (theme) => ({
    paper: {
        width: '100%',
       // marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        
    },
});

export default function Users() {

     constructor(props) {
        super(props);
        this.state = {
            Users: []
            
        };
    }

      
    getUsersData() {
        
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
        const classes = styles();
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = event => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
        const emptyRows =
          rowsPerPage - Math.min(rowsPerPage, Users.length - page * rowsPerPage);
      
        

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

             {Users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

              
                  <TableCell align="right">{row.acct_doc_header_id}</TableCell>  
                <TableCell align="right">{row.company_id}</TableCell>  
                <TableCell align="right">{row.document_number}</TableCell>  
                <TableCell align="right">{row.doc_type}</TableCell>  
                <TableCell align="right">{row.customer_number}</TableCell>  
                <TableCell align="right">{row.fk_customer_map_id}</TableCell>  
                <TableCell align="right">{row.customer_name}</TableCell>  

                <TableCell align="right">{row.document_create_date}</TableCell>  
                <TableCell align="right">{row.baseline_create_date}</TableCell>  
                <TableCell align="right">{row.invoice_id}</TableCell>  
                <TableCell align="right">{row.total_open_amount}</TableCell>  
                <TableCell align="right">{row.cust_payment_terms}</TableCell>
                <TableCell align="right">{row.clearing_date}</TableCell>  
                <TableCell align="right">{row.isOpen}</TableCell>  
                <TableCell align="right">{row.ship_date}</TableCell>  
                <TableCell align="right">{row.paid_amount}</TableCell>  
                <TableCell align="right">{row.dayspast_due}</TableCell>  
                <TableCell align="right">{row.document_id}</TableCell>  
                  
                <TableCell align="right">{row.actual_open_amount}</TableCell>  
                <TableCell align="right">{row.invoice_age}</TableCell>  
                <TableCell align="right">{row.invoice_amount_doc_currency}</TableCell>  
                <TableCell align="right">{row.payment_method}</TableCell>  
                
                    

                  

                </TableRow>  

            ))
    

}  

          </TableBody>  

        </Table>  
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      </Paper>

    );  

  
        }
    }
    
  

export default Users; 
        

