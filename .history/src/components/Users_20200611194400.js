import React, { Component } from 'react';
import axios from "../components/axios.js";
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';  

import TableContainer from '@material-ui/core/TableContainer';  

import TableHead from '@material-ui/core/TableHead';  

import TableRow from '@material-ui/core/TableRow';  

import Paper from '@material-ui/core/Paper'; 

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
            <TableContainer component={Paper}>  

        <Table stickyHeader  aria-label="sticky table">  

          <TableHead>  

            <TableRow>  

              <TableCell>Id</TableCell>  

              <TableCell align="right">Name</TableCell>  

              <TableCell align="right">Age</TableCell>  

              <TableCell align="right">Address</TableCell>  

              <TableCell align="right">City</TableCell>  

              <TableCell align="right">ContactNum</TableCell>  

              <TableCell align="right">Salary</TableCell>  
              <TableCell align="right">ContactNum</TableCell>  

              <TableCell align="right">Salary</TableCell>  

              <TableCell style={{paddingRight:"60px"}} align="right" >Department</TableCell>  

            </TableRow>  

          </TableHead>  

          <TableBody>  

            {  

              this.state.ProductData.map((p, index) => {  

                return <TableRow key={index}>  

                  <TableCell component="th" scope="row">  

                    {p.Id}  

                  </TableCell>  
                <TableCell align="right">{p.name}</TableCell>  

                  <TableCell align="right">{p.username}</TableCell>  
                <TableCell align="right">{p.email}</TableCell>  

                  <TableCell align="right">{p.address}</TableCell>  

                  <TableCell align="right">{p.street}</TableCell>  

                  <TableCell align="right">{p.Salary}</TableCell>  

                  <TableCell style={{paddingRight:"114px"}} align="right">{p.Department}</TableCell>  

                </TableRow>  

              })  

            }  

          </TableBody>  

        </Table>  

      </TableContainer>  

    );  

  
        }
    }

  

export default Users; 
        

