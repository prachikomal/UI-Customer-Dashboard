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
      
      
      query: "",
      columnToQuery: "customer_name"
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
              
            </Table>
          </Paper>
          
        </div>
      );
    }
  }




export default TableClass;