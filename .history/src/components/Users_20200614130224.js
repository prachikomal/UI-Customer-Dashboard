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
   notchedOutline: { borderWidth: '1px', borderColor: '#5DAAE0 !important' },
 });

class TableClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceList: [],
      columns: [],
      rowsPerPage: 8,
      page: null,
      load: true,
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
      const { invoiceList, columns, page, rowsPerPage } = this.state;
      const { classes, count, theme } = this.props;
      console.log(this.props.invoiceList);
      return (
        <div>
          
            <Table>
              <TableHead style={{ backgroundColor: '#282c34', color: 'white' }}>
                <TableRow >
                  <TableCell padding='checkbox'>
                    <CheckBox
                      style={{ backgroundColor: '#252c59' }}
                      // onChange={ }#252c59
                    />
                  </TableCell >
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
                        <TableCell padding='checkbox' style={{ backgroundColor: "rgba(27,31,56,.85)", color: 'white' }}>
                          <CheckBox align='right' />
                        </TableCell>
                        {this.state.columns.map((col) => {
                          return (
                            <TableCell  style={{ backgroundColor: "rgba(27,31,56,.85)", color: 'white' }} component='td' scope='row' align='center'>
                              {invoice[col]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          
          <TablePagination style={{ backgroundColor: "rgba(27,31,56,.85)", color: 'white', flo }}
            rowsPerPageOptions={[5, 50, 100]}
            colSpan={4}
            count={invoiceList.length}
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