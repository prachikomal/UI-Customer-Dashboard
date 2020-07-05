/*import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'acct_doc_header_id', numeric: false, disablePadding: true, label: 'acct_doc_header_id' },
    { id: 'company_id  ', numeric: true, disablePadding: false, label: 'company_id' },
    { id: 'document_number', numeric: true, disablePadding: false, label: 'document_number' },
    { id: 'business_code', numeric: true, disablePadding: false, label: 'business_code' },
    { id: 'doctype', numeric: true, disablePadding: false, label: 'doctype' },
    { id: 'customer_number', numeric: true, disablePadding: false, label: 'customer_number' },
    { id: 'fk_customer_map_id', numeric: true, disablePadding: false, label: 'fk_customer_map_id' },
    { id: 'customer_name', numeric: true, disablePadding: false, label: 'customer_name' },
    { id: 'document_create_date', numeric: true, disablePadding: false, label: 'document_create_date' },
    { id: 'invoice_id', numeric: true, disablePadding: false, label: 'invoice_id' },
    { id: 'baseline_create_date', numeric: true, disablePadding: false, label: 'dbaseline_create_date' },
    { id: 'invoice_date_norm', numeric: true, disablePadding: false, label: 'invoice_date_norm' },
    { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'total_open_amount' },
    { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'cust_payment_terms' },
    { id: 'ship_date', numeric: true, disablePadding: false, label: 'ship_date' },
    { id: 'clearing_date', numeric: true, disablePadding: false, label: 'clearing_date' },
    { id: 'isOpen', numeric: true, disablePadding: false, label: 'isOpen' },
    { id: 'document_creation_date', numeric: true, disablePadding: false, label: 'document_creation_date' },
    { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'invoice_amount_doc_currency' },
    { id: 'document_id', numeric: true, disablePadding: false, label: 'document_id' },
    { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'actual_open_amount' },
    { id: 'paid_amount', numeric: true, disablePadding: false, label: 'paid_amount' },
    { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'dayspast_due' },
    { id: 'invoice_age', numeric: true, disablePadding: false, label: 'invoice_age' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead >
        <TableRow>
          <TableCell padding="checkbox" style={{color:"white"}}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{color:"#ffffff"}}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
                style={{color:"#ffffff"}}
                style={{color:"#ffffff"}}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                    style={{color:"#ffffff"}}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    color:"white",
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          backgroundColor: theme.palette.primary.main,
        }
      : {
          backgroundColor: theme.palette.primary.main,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: "white",
  },
  title: {
    flex: '0 0 auto',
    color:"#ffffff"
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >

      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="white" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle"  style={{color:"#ffffff"}}>
            Invoices
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Predict">
            <Button variant="contained">Predict</Button>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
  },
  table: {
    color: "#ffffff",
    minWidth: 1080,  
  },
  tableCell: {
    color: "#ffffff",    
  },

  tableWrapper: {
    color: "#ffffff",
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {

  constructor (props){
    super(props)

    this.state={
        data: [],
        order: 'asc',
        orderBy: 'document_number',
        selected: [],
        page: 0,
        rowsPerPage: 5
    }
  }


  componentDidMount(){
    axios.get('http://localhost:8080/Summer_Internship_Backend/DisplayDataServlet.do')
   .then(response => {
    //console.log(response)
        this.setState({ data: response.data });
        //this.forceUpdate();
        }).catch(error=>{
          console.log(error)
        });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.document_number) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}  style={{color:"white"}}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody style={{color:"#ffffff"}}>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.document_number);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.document_number)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.document_number}
                      selected={isSelected}
                      
                    >
                      <TableCell padding="checkbox" > 
                        <Checkbox checked={isSelected} style={{color:"#ffffff"}} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" style={{color:"#ffffff"}}>{n.pk_id}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.acct_doc_header_id}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.company_id}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.document_number}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.document_number_norm}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.business_code}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.doctype}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.customer_number}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.fk_customer_map_id}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.customer_name}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.document_create_date}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.baseline_create_date}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.invoice_id}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.total_open_amount}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.cust_payment_terms}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.clearing_date}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.isOpen}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.ship_date}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.paid_amount}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.days_past_due_date}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.actual_payment_amount}</TableCell>
                      <TableCell align="right" style={{color:"#ffffff"}}>{n.invoice_ag}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          style={{color:"#ffffff"}}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          style={{color:"#ffffff"}}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
*/

import React from "react";
import axios from "axios";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "company_id",
    numeric: true,
    disablePadding: true,
    label: "Company ID",
  },
  {
    id: "acct_doc_header_id",
    numeric: true,
    disablePadding: true,
    label: "Account Header ID",
  },
  {
    id: "document_number",
    numeric: true,
    disablePadding: false,
    label: "Document Number",
  },
  {
    id: "business_code",
    numeric: true,
    disablePadding: false,
    label: "Business Code",
  },
  {
    id: "doctype",
    numeric: true,
    disablePadding: false,
    label: "Document Type",
  },
  {
    id: "customer_number",
    numeric: false,
    disablePadding: true,
    label: "Customer Number",
  },
  {
    id: "fk_customer_map_id",
    numeric: false,
    disablePadding: true,
    label: "Customer Map ID",
  },
  {
    id: "customer_name",
    numeric: true,
    disablePadding: true,
    label: "Name Of Customer",
  },
  {
    id: "baseline_create_date",
    numeric: true,
    disablePadding: true,
    label: "Baseline Date",
  },
  {
    id: "invoice_date_norm",
    numeric: true,
    disablePadding: false,
    label: "Invoice Date",
  },
  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "Invoice ID",
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount",
  },
  {
    id: "cust_payment_terms",
    numeric: false,
    disablePadding: true,
    label: "Customer Payment Terms",
  },
  {
    id: "clearing_date",
    numeric: false,
    disablePadding: true,
    label: "Clear Date",
  },
  {
    id: "isOpen",
    numeric: true,
    disablePadding: true,
    label: "Is Open Invoice",
  },
  {
    id: "ship_date",
    numeric: true,
    disablePadding: true,
    label: "Shipping Date",
  },
  {
    id: "paid_amount",
    numeric: true,
    disablePadding: false,
    label: "Payment Amount",
  },
  {
    id: "dayspast_due",
    numeric: true,
    disablePadding: false,
    label: "Days past Due date",
  },
  { id: "document_id", numeric: true, disablePadding: false, label: "Doc Id" },
  {
    id: "document_creation_date",
    numeric: false,
    disablePadding: true,
    label: "Document Create Date",
  },
  {
    id: "actual_open_amount",
    numeric: false,
    disablePadding: true,
    label: "Actual Amount Outstanding",
  },
  {
    id: "invoice_age",
    numeric: true,
    disablePadding: true,
    label: "Age of Invoice",
  },
  {
    id: "invoice_amount_doc_currency",
    numeric: true,
    disablePadding: true,
    label: "Invoice Currency",
  },
  {
    id: "predicted_type",
    numeric: true,
    disablePadding: false,
    label: "Predicted Payment Type",
  },
  {
    id: "predicted_amt",
    numeric: true,
    disablePadding: false,
    label: "Predicted Amount",
  },





];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" style={{ color: "white" }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{ color: "#ffffff" }}
            />
          </TableCell>
          {rows.map(
            (row) => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
                style={{ color: "#ffffff" }}
                style={{ color: "#ffffff" }}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                    style={{ color: "#ffffff" }}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
    color: "white",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          backgroundColor: theme.palette.primary.main,
        }
      : {
          backgroundColor: theme.palette.primary.main,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: "white",
  },
  title: {
    flex: "0 0 auto",
    color: "#ffffff",
  },
});

let EnhancedTableToolbar = (props,data) => {
  const { numSelected, classes } = props;
  const prediction = (data) => {
    axios.post(
      "http://127.0.0.1:5000/predict?",
      {},
      {
        headers: { "Content-Type": "application/json" },
        params: {
          data: data,
        },
      }
    // ).then(response=>EnhancedTable().setState({data:response}));
    ).then(response=>console.log("prediction",response));
  };
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="white" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" style={{ color: "#ffffff" }}>
            Invoices
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
            <Button variant="contained" onClick={()=>prediction(data)}>Predict</Button>
        ) : (
          <Tooltip title="Predict">
            <Button variant="contained">Predict</Button>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}; //

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
//

const styles = (theme) => ({
  root: {
    width: "100%",
    //marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
  },
  table: {
    color: "#ffffff",
    minWidth: 1080,
    width: "6200px",
    overflow:"auto"
    //overflow: 'hidden',
  },
  tableCell: {
    color: "#ffffff",
  },

  tableWrapper: {
    color: "#ffffff",
    overflow: "auto",
    height:370,
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      order: "asc",
      orderBy: "document_number",
      selected: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/1706431/PopulateTable")
      .then((response) => {
        //console.log(response)
        this.setState({ data: response.data });
        //this.forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.state.data = Array.from(this.state.data);
      this.setState((state) => ({
        selected: state.data.map((n) => n.document_number),
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    //console.log(this.state.data)
    console.log(this.state.data.length);
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar data={this.state.data} numSelected={selected.length} />
        <div className={classes.tableWrapper} style={{ color: "white" }}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.data.length}
              style={{ backgroundColor: '#282c34', color: 'white' }}
            />

            <TableBody style={{ paddingLeft: "8px" }}>
              {stableSort(
                Array.from(this.state.data),
                getSorting(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = this.isSelected(n.document_number);
                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        this.handleClick(event, n.document_number)
                      }
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.pk_id}
                      selected={isSelected}
                      style={{ backgroundColor: 'black' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          style={{ backgroundColor: '#252c59' }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        style={{ color: 'rgb(182, 182, 182)' }}
                      >
                        {n.company_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: 'rgb(182, 182, 182)' }}>
                        {n.acct_doc_header_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: 'rgb(182, 182, 182)' }}>
                        {n.document_number}
                      </TableCell>
                      <TableCell align="right"style={{ color: 'white' }}>
                        {n.business_code}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.doctype}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.customer_number}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.fk_customer_map_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.customer_name}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.document_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.baseline_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.invoice_date_norm}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.invoice_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.total_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.cust_payment_terms}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.clearing_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.isOpen}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.ship_date}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.paid_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.dayspast_due}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.document_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.actual_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.invoice_age}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.invoice_amount_doc_currency}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        ""
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        ""
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          style={{ color: "#ffffff" }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          style={{
            color: "#ffffff",
            backgroundColor: "#28324B",
            height: "4rem",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
