import React, { Component } from 'react';
import axios from "../components/axios.js";

export default class Users extends Component {
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
31
        <Table stickyHeader  aria-label="sticky table">  
32
          <TableHead>  
33
            <TableRow>  
34
              <TableCell>Id</TableCell>  
35
              <TableCell align="right">Name</TableCell>  
36
              <TableCell align="right">Age</TableCell>  
37
              <TableCell align="right">Address</TableCell>  
38
              <TableCell align="right">City</TableCell>  
39
              <TableCell align="right">ContactNum</TableCell>  
40
              <TableCell align="right">Salary</TableCell>  
41
              <TableCell style={{paddingRight:"60px"}} align="right" >Department</TableCell>  
42
            </TableRow>  
43
          </TableHead>  
44
          <TableBody>  
45
            {  
46
              this.state.ProductData.map((p, index) => {  
47
                return <TableRow key={index}>  

                  <TableCell component="th" scope="row">  

                    {p.Id}  

                  </TableCell>  
                <TableCell align="right">{p.Name}</TableCell>  

                  <TableCell align="right">{p.Age}</TableCell>  
                <TableCell align="right">{p.Address}</TableCell>  

                  <TableCell align="right">{p.City}</TableCell>  

                  <TableCell align="right">{p.ContactNum}</TableCell>  

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

  

export default MatTable 
        )
    }
}
