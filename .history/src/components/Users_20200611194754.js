import React, { Component } from 'react';
import axios from "../components/axios.js";
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';  

  

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

              <TableCell align="right">1</TableCell>  

              <TableCell align="right">2</TableCell>  

              <TableCell align="right">3</TableCell>  

              <TableCell align="right">4</TableCell>  

              

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
        

