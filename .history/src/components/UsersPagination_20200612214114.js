import React from 'react';  
2
import { makeStyles } from '@material-ui/core/styles';  
3
import Paper from '@material-ui/core/Paper';  
4
import Table from '@material-ui/core/Table';  
5
import TableBody from '@material-ui/core/TableBody';  
6
import TableCell from '@material-ui/core/TableCell';  
7
import TableContainer from '@material-ui/core/TableContainer';  
8
import TableHead from '@material-ui/core/TableHead';  
9
import TablePagination from '@material-ui/core/TablePagination';  
10
import TableRow from '@material-ui/core/TableRow';  
11
import axios from 'axios';    
12
import { useState, useEffect } from 'react'   
13
  
14
  
15
const useStyles = makeStyles({  
16
  root: {  
17
    width: '100%',  
18
  },  
19
  container: {  
20
    maxHeight: 440,  
21
  },  
22
});  
23
  
24
export default function MatPaginationTable() {  
25
  const classes = useStyles();  
26
  const [page, setPage] = React.useState(0);  
27
  const [data, setData] = useState([]);   
28
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
29
  useEffect(() => {    
30
        const GetData = async () => {    
31
          const result = await axios('http://localhost:51760/Api/Emp/employee');    
32
          setData(result.data);    
33
        }  
34
        GetData();    
35
        console.log(data);  
36
}, []);   
37
  const handleChangePage = (event, newPage) => {  
38
    setPage(newPage);  
39
  };  
40
  
41
  const handleChangeRowsPerPage = event => {  
42
    setRowsPerPage(+event.target.value);  
43
    setPage(0);  
44
  };  
45
  
46
  return (  
47
    <Paper className={classes.root}>  
48
      <TableContainer className={classes.container}>  
49
        <Table stickyHeader aria-label="sticky table">  
50
        <TableHead>  
51
            <TableRow>  
52
              <TableCell>Id</TableCell>  
53
              <TableCell align="right">Name</TableCell>  
54
              <TableCell align="right">Age</TableCell>  
55
              <TableCell align="right">Address</TableCell>  
56
              <TableCell align="right">City</TableCell>  
57
              <TableCell align="right">ContactNum</TableCell>  
58
              <TableCell align="right">Salary</TableCell>  
59
              <TableCell align="right">Department</TableCell>  
60
            </TableRow>  
61
          </TableHead>  
62
          <TableBody>  
63
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
64
              return (  
65
           <TableRow >  
66
                <TableCell component="th" scope="row">  
67
                  {row.Id}  
68
                </TableCell>  
69
                <TableCell align="right">{row.Name}</TableCell>  
70
                <TableCell align="right">{row.Age}</TableCell>  
71
                <TableCell align="right">{row.Address}</TableCell>  
72
                <TableCell align="right">{row.City}</TableCell>  
73
                <TableCell align="right">{row.ContactNum}</TableCell>  
74
                <TableCell align="right">{row.Salary}</TableCell>  
75
                <TableCell align="right">{row.Department}</TableCell>  
76
              </TableRow>  
77
                 
78
              );  
79
            })}  
80
          </TableBody>  
81
        </Table>  
82
      </TableContainer>  
83
      <TablePagination  
84
        rowsPerPageOptions={[5, 10, 15]}  
85
        component="div"  
86
        count={data.length}  
87
        rowsPerPage={rowsPerPage}  

        page={page}  

        onChangePage={handleChangePage}  

        onChangeRowsPerPage={handleChangeRowsPerPage}  

      />  

    </Paper>  

  );  

} 