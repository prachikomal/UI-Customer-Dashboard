import React, { Component } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';

const styles = (theme) => ({
   root: {
     width: '100%',
     marginTop: theme.spacing.unit * 4,
     height: '15vh',
     overflowY: 'scroll',
   },
   table: {
     overflowX: 'scroll',
   },
 });

class TableClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "customer_name",
      data: [],
      columns: [],
      rowsPerPage: 3,
      page: null,
      load: true,
    };
  }

  async componentWillMount() {
    const response = await  axios('http://localhost:8080/Summer_Internship_Backend/PopulateTable');
    
    this.setState({
      data: response.data,
      columns: Object.keys(response.data[0]),
      load: false,
    });
  }

  handleChangePage = (event, page) => {
    this.setState({
      page: page,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
      const { data, columns, page, rowsPerPage } = this.state;
      const { classes, count, theme } = this.props;
      console.log(this.props.invoiceList);
      return (
        <div className="TableClass">
        <div style={{ display: "flex" }}>
           <div style={{ display: "flex", margin: "auto" }}>        
          <TextField
                hintText="Query"
                floatingLabelText="Query"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              </div>
              </div>
          
            
            <Table data={
              this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data
          }>
            
              <TableHead style={{ backgroundColor: '#282c34', color: 'white' }}>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <CheckBox
                      style={{ backgroundColor: '#252c59' }}
                      // onChange={ }#252c59
                    />
                  </TableCell>
                  {columns.map((col) => {
                    return (
                      <TableCell
                        component='th'
                        align='left'
                        style={{ color: 'rgb(182, 182, 182)' }}
                      >
                        {col}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((invoice) => {
                    return (
                      <TableRow className={styles.tableRow}>
                        <TableCell padding='checkbox'>
                          <CheckBox align='right' />
                        </TableCell>
                        {this.state.columns.map((col) => {
                          return (
                            <TableCell component='td' scope='row' align='center'>
                              {invoice[col]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          
          <TablePagination
            rowsPerPageOptions={[5,20, 50, 100]}
            colSpan={4}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
        
      );
    }
  }






export default TableClass;