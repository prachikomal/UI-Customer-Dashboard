import React, { Component } from "react";
import classNames from "classnames";
import { CSVLink, CSVDownload } from "react-csv";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { getAllByAltText } from "@testing-library/react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import { formatter } from "../utils/formatter";
import ModifyPop from "../components/ModifyPop";
import Navbar2 from "../components/Navbar2";
import Centerlogo from "../components/Centerlogo"

const rows = [
  {
    id: "0",
    numeric: false,
    disablePadding: true,
    label: "Company ID",
  },
  { id: "1", numeric: true, disablePadding: false, label: "Account Header ID" },
  { id: "2", numeric: true, disablePadding: false, label: "Document Number" },
  { id: "3", numeric: true, disablePadding: false, label: "Business Code" },
  { id: "4", numeric: true, disablePadding: false, label: "Document Type" },
  { id: "5", numeric: true, disablePadding: false, label: "Customer Number" },
  { id: "6", numeric: true, disablePadding: false, label: "Customer Map ID" },
  { id: "7", numeric: true, disablePadding: false, label: "Name Of Customer" },
  {
    id: "8",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  { id: "9", numeric: true, disablePadding: false, label: "Baseline Date" },
  { id: "10", numeric: true, disablePadding: false, label: "Invoice Date" },
  { id: "11", numeric: true, disablePadding: false, label: "Invoice ID" },
  {
    id: "12",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount",
  },
  {
    id: "13",
    numeric: true,
    disablePadding: false,
    label: "Customer Payment Terms",
  },
  { id: "14", numeric: true, disablePadding: false, label: "Clear Date" },
  { id: "15", numeric: true, disablePadding: false, label: "Is Open Invoice" },
  { id: "16", numeric: true, disablePadding: false, label: "Shipping Date" },
  { id: "17", numeric: true, disablePadding: false, label: "Payment Amount" },
  {
    id: "18",
    numeric: true,
    disablePadding: false,
    label: "Days past Due date",
  },
  { id: "19", numeric: true, disablePadding: false, label: "Doc Id" },
  {
    id: "20",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  {
    id: "21",
    numeric: true,
    disablePadding: false,
    label: "Actual Amount Outstanding",
  },
  { id: "22", numeric: true, disablePadding: false, label: "Age of Invoice" },
  { id: "23", numeric: true, disablePadding: false, label: "Invoice Currency" },
  {
    id: "24",
    numeric: true,
    disablePadding: false,
    label: "Predicted Payment Type",
  },
  { id: "25", numeric: true, disablePadding: false, label: "Predicted Amount" },
];

class EnhancedTableHead extends React.Component {
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
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{ color: "white" }}
            />
          </TableCell>
          {rows.map(
            (row) => (
              <TableCell
                
              >
                <TableSortLabel direction={order} style={{ color: "white" }}>
                  {row.label}
                </TableSortLabel>
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
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;
//for the two dynamic card data
  const findOpenAR = (data) => {
    const openARarray = data.map((d) => d.actual_open_amount);
    const totalOpenAR = openARarray.reduce((tot, item) => (tot += item), 0);
    return totalOpenAR;
  };
  const findOpenInvoices = (data) => {
    const isOpenArr = data.map((d) => d.isOpen);
    const totalOpenInvoices = isOpenArr.filter((i) => i === 1).length;
    return totalOpenInvoices;
  };

  return (
    <Toolbar className={classes.root}>
      {console.log(props)}
      <Grid container>
        <Grid item xs={1} style={{ marginTop: "20px" }}>
          <div className={classes.title}>
            {numSelected == 1 ? (
              <Button
                variant="outlined"
                className={classes.button}
                onClick={props.onClick}
                style={{ borderColor: "#64b5f6" }}
              >
                Modify
              </Button>
            ) : (
              <Button
                variant="outlined"
                className={classes.buttonDisabled}
                style={{ color: "grey", borderColor: "grey" }}
                disabled
              >
                Modify
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={1} style={{ marginTop: "20px" }}>
          <div className={classes.title}>
            {numSelected >= 1 ? (
              <Button
                autoid="export-button"
                variant="contained"
                color="primary"
                className={classes.button}
                
              onClick={()=>new  CustomerDetails().onExportClick()}
                
              >
                <CSVLink 
                
                data={props.data} filename={"data.csv"}>
                  Export
                </CSVLink>
              </Button>
            ) : (
              <Button
                variant="outlined"
                className={classes.buttonDisabled}
                style={{ color: "grey", borderColor: "grey" }}
                disabled
              >
                Export
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={6} />
        <Grid item container xs={4}>
          <Grid item xs={6}>
            <Typography variant="h5" style={{ color: "white" }}>
              {findOpenInvoices(props.data)}
            </Typography>
            <p style={{ color: "grey" }}>Total Open Invoices</p>
          </Grid>
          <Grid item xs={6}>
            {console.log(findOpenAR(props.data))}
            <Typography variant="h5" style={{ color: "white" }}>
              {"$" + formatter(findOpenAR(props.data))}
            </Typography>
            <p style={{ color: "grey" }}>Total Open Amount</p>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = (theme) => ({
  root: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    backgroundColor: "#252C48",
  },
  table: {
    minWidth: 1020,
    backgroundColor: "#1B1F38",
  },
  tableWrapper: {
    overflowX: "auto",
    marginLeft: "-5%",
    marginRight: "-3%",
    height: 450,
  },
  dashboard: {
    color: "white",
    textAlign: "center",
    position: "relative",
    marginLeft: "-15%",
    marginTop: "-0.6%",
    background: "linear-gradient(45deg, orange, 30%, #ff8e53 90%)",
    borderRadius: "0.35vw",
    height: "2vw",
    padding: "0 1vw",
  },
  bot: {
    textAlign: "center",marginLeft:"auto", borderRadius: "20px", padding:"4px",
  },
  center: {textAlign: "center"},
});

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.fetchTable = this.fetchTable.bind(this);
    this.onExportClick = this.onExportClick.bind(this);
    this.state = {
     // order: "asc",
      //orderBy: "Account Header ID",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      openDialog: false,
      selecteddata: null,
      csv_data: 0,
    };
  }

  fetchTable(query) {
    Axios.get("http://localhost:8080/1706431/SpecificCustomer", {
      params: { tosearch: query },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch((e) => console.log(e));
  }

  componentWillMount() {
    console.log(this.props.match.params.id);
    this.fetchTable(this.props.match.params.id);
  }

  getAll() {
    console.log(this.state.data.length);
    var data = [];
    for (var i = 1; i <= this.state.data.length; i++) data.push(i);
    return data;
  }

  onExportClick() {
    var objArray;
    var selected = []//this.props.records
    if (this.props.records) {
      objArray = this.props.records;
    }
    var count = 0
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < selected.length; j++) {
        if (array[i].pk_id == selected[j]) {
          var line = '';
          for (var index in array[i]) {
            console.log(array[i][index]);
            if (line !== '') line += ','

            line += array[i][index];
          }

          str += line + '\r\n'
         
        }
      }
      
    }
  }

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState({
        selected: this.getAll(),
      });
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

  parse(data) {
    var dt = [];
    for (var i = 0; i < data.length; i++) dt.push({ id: i + 1, ...data[i] });
    return dt;
  }

  handleDialog(data) {
    console.log(this.state);
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == this.state.selected[0]) {
        this.setState({
          selecteddata: data[i],
          openDialog: true,
        });
        break;
      }
    }
  }

  handlemodifyClose() {
    this.setState({
      openDialog: false,
      selecteddata: null,
    });
    window.location.reload(true);
  }
  render() {
    console.log(this.state);
    console.log("CUSTOMERDETAILS",this)
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const data = this.parse(this.state.data);
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <div>
        <Grid container xs={12} spacing={24}>
          <Grid item container xs={6} style={{ height: "4vw" }}>
            <IconButton aria-label="Back" color="primary">
              <Link to="/">
                <ArrowBackIcon style={{ color: "white" }} />
              </Link>
            </IconButton>
          </Grid>
          <Grid item container xs={6} style={{ height: "4vw" }}>
          <div style={styles.center}>
            <Centerlogo/>
            </div>
            <Navbar2/>
          </Grid>
        </Grid>

        <Typography
          style={{
            color: "white",
            marginLeft: "3%",
            marginTop: "-2.75%",
            fontSize: "3vh",
          }}
        >
          {this.props.match.params.name}
        </Typography>
        <Typography
          style={{
            color: "white",
            marginLeft: "3%",
            marginTop: "0.5%",
            fontSize: "2vh",
          }}
        >
          {this.props.match.params.id}
        </Typography>
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            data={data}
            onClick={this.handleDialog.bind(this, data)}
          />
          {this.state.openDialog && (
            <ModifyPop
              data={this.state.selecteddata}
              onClose={this.handlemodifyClose.bind(this)}
            />
          )}
          <Paper style={{ width: "90%", marginLeft: "6%" }}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  rowCount={data.length}
                  value={data}
                />
                <TableBody>
                  {data.length != 0 &&
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((n) => {
                        const isSelected = this.isSelected(n.id);
                        return (
                          <TableRow
                            hover
                            onClick={(event) => this.handleClick(event, n.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                style={{ color: "white" }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                              style={{ color: "white" }}
                            >
                              {n.company_id}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.acct_doc_header_id}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.document_number}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.business_code}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.doctype}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.customer_number}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.fk_customer_map_id}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.customer_name}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.document_create_date}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.baseline_create_date}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.invoice_date_norm}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.invoice_id}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.total_open_amount}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.cust_payment_terms}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.clearing_date}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.isOpen}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.ship_date}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.paid_amount}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.dayspast_due}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.document_id}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.document_creation_date}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.actual_open_amount}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.invoice_age}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {n.invoice_amount_doc_currency}
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              partial
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              0.0
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Paper>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            style={{ color: "white" }}
          />
        </Paper>
      </div>
    );
  }
}

CustomerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomerDetails);
