import React, { Component } from 'react';
import axios from "../components/axios.js";
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

const styles = (theme) => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        
    },
});


function enhancedTable(props) 
        {
          const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
          const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
          };

          return (
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
               
                
              </TableRow>
            </TableHead>
          );
        }

        
      

      enhancedTable.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
      };


export  class Users extends Component {
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
        

        return (
            <Paper style={styles.paper}>

        <Table>  

          <TableHead>  

            <TableRow>  
           
              <TableCell>Customer Number</TableCell> 
            
              <TableCell>Name Of Customer</TableCell> 
             
           
              <TableCell>Total Open Amount</TableCell> 
           
              
              

            </TableRow>  

          </TableHead>  

          <TableBody>  

            {  

              this.state.Users.map((p, index) => {  

                return <TableRow key={index}>  
                
                 
                <TableCell align="right">{p.customer_number}</TableCell>  
               
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
        

