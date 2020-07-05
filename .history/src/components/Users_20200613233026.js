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
      data: [],
      columns: [],
      rowsPerPage: 3,
      page: null,
      load: true,
    };
  }

  async componentWillMount() {
    const response = await  axios('http://localhost:8080/Summer_Internship_Backend/PopulateTable');
    // this.props.loadState(response.data);
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
      const { data, columns, page, rowsPerPage } = this.state;
      const { classes, count, theme } = this.props;
      console.log(this.props.invoiceList);
      return (
        <div style={{ padding: '10px' }}>
          <Paper>
            <Table>
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
          </Paper>
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


const mapDispatchToProps = (dispatch) => {
  return {
    loadState: (payload) => dispatch({ type: 'LOAD_STATE', payload: payload }),
  };
};

const mapStateToProps = (state) => {
  console.log('From state' + state);
  return { invoiceList: state.invoiceList };
};

export default TableClass;