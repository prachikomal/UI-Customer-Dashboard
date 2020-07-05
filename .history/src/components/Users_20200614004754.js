import React, { Component } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { getInvoiceList } from '../services/service';
import TextField from "@material-ui/core/TextField";

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
      invoiceList: [],
      columns: [],
      rowsPerPage: 7,
      page: null,
      load: true,
      editIdx: -1,
      columnToSort: "",
      sortDirection: "desc",
      query: "",
      columnToQuery: "firstName"
    };
  }

  async componentWillMount() {
    const response = await getInvoiceList();
    // this.props.loadState(response.data);
    this.setState({
      invoiceList: response.data,
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
      const { invoiceList, columns, page, rowsPerPage } = this.state;
      const { classes, count, theme } = this.props;
      console.log(this.props.invoiceList);
      return (
        <div style={{ padding: '10px' }}>
          <Paper>
          <TextField
                hintText="Query"
                floatingLabelText="Query"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
            <Table  invoiceList={
              this.state.query
                ? this.state.invoiceList.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.invoiceList 
              
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
                {invoiceList
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
          </Paper>
          
        </div>
      );
    }
  }




export default TableClass;