
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import axios from 'axios';
//import header from "./Header";


const row_headings = [
  "Company Id",
  "Account Header ID",
  "Document Number",
  "Business Code",
  "Document Type",
  "Customer Number",
  "Customer Map ID",
  "Name Of Customer",
  "Document Create Date",
  "Baseline Date ",
  "Invoice  Date",
  "Invoice ID",
  "Total Open Amount",
  "Customer Payment Terms",
  "Clear Date",
  "Is Open Invoice",
  "Shipping Date",
  "Payment Amount",
  "Days past Due date",
  "Doc Id",
  
  "Actual Amount Outstanding",
  "Age of Invoice",
  "Invoice Currency",
  "Predicted Payment Type",
  "Predicted Amount",
];

class EnhancedTableHead extends React.Component {
  render() {
    const { onSelectAllClick, numSelected, rowCount, } = this.props;
    const header_background= {
        backgroundColor: "#191c33",
        color: 'primary',
        marginRight:20,
      };
    const table_cell= {
        color: "#FFFFFFA6",
        fontSize: "14px",
        fontWeight: "bolder",
        //fontSize: "10px",
        backgroundColor:"#191c33",
        overflow: "hidden",
        //color: "#b5b8c4",
        whiteSpace: "nowrap",
      };

    return (
      <TableHead style={header_background}>
        <TableRow>
          <TableCell padding="checkbox">
            <label>
            <Checkbox
              style={{color:"white"}}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
            </label>
          </TableCell>
          {row_headings.map(
            (row_heading) => (
              <TableCell component="th" style={table_cell}>
                {row_heading}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}


const styles = (theme) => ({
  "@global": {
    color: "#b5b8c4",
  },
  bg_global: {
    
    marginLeft:"1rem",
    marginRight:"1.5rem",
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#252c48",
  },
  table: {},
  table_Wrapper: {
    marginTop:"2rem",
    color: "#ffffff",
    overflow: "auto",
    height: 300,
  },
  eachelement: {
    color: "#b5b8c4",
    backgroundColor: "#191c33",
    textAlign:"center",
    fontSize:"16px",
    whiteSpace: "nowrap"
  },
  table_body: {
    overflowY: "scroll",
    color : "white",
    backgroundColor: "#191c33"
  },
  toolbar_bg: {
    paddingRight: theme.spacing.unit,
    overflowX: "scroll",
    backgroundColor: "#252c48",
  },
  toolbar_title: {
    flex: "0 0 auto",
    display: "inline-flex",
    margin: theme.spacing.unit
  },
  toolbar_heads: {
    color: "#b5b8c4",
    fontSize:35,
    marginTop:"30px"
  },
  predict_button: {
    marginTop:"40px",
    float: "right"
  },
  predictbutton: {
    position: "absolute",
    right: "40px",
    backgroundColor: "#8f96a3",
    color: "#fff",
    border:"1px solid white"
  }
});

class   Users extends React.Component {
    constructor(props){

        super(props)
        this.state = {
            selected: [],
            data: [],
            prediction: {},
            page: 0,
            selectedRow:[],
            rowsPerPage: 10,
          };          
    }
 

  componentDidMount() {
      axios.get(`http://localhost:8080/1706431/PopulateTable`)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handle_SelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((no_of_rows) => no_of_rows.pk_id) }));
      this.setState((state) =>({selectedRow: this.state.data}))
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected,selectedRow } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newSelectedRow =[];
    const data = this.state.data;

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedRow = newSelectedRow.concat(
        selectedRow,
        data.filter((row) => row.pk_id === id)
      )
      console.log('pk_id at handle click',newSelectedRow)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedRow = newSelectedRow.concat(selectedRow.slice(1));
      
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedRow = newSelectedRow.concat(newSelectedRow.slice(1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedRow = newSelectedRow.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1)
      )
    }
    

    this.setState({ selected: newSelected });
    this.setState({ selectedRow: newSelectedRow });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    return (<div>
      <div autoid="pagination-button-next-collector">
      </div>
      <div autoid="pagination-button-previous-collector">
      </div>
    </div>)
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;



   handle_predict= (event) => {
    console.log("Value to be predicted after calling predict",this.state.selectedRow) 

    axios.post("http://127.0.0.1:5000/predict",
    {},
    
    {headers: { 'Content-Type': 'application/json' },
    params:{ data:
    {id : "1706431",
    data: this.state.selectedRow},
    }
    
      
    },
    
  
  
    ).then( 
      (response) => { 
          console.log("response",response)
          this.setState({prediction : this.parsePredict(response.data)})
        
          console.log(this.state.prediction);
      }).catch 
      (error => { 
          console.log(error); 
          this.setState({error:"ERROR"})
      } 
    ); 

  }
  

  parsePredict(data) {
    var dt = {};
    for (var i = 0; i < data.length; i++) {
      dt[data[i].pk_id] = data[i];
    }
    return dt;
  }

   render() {

    const { classes } = this.props;
    const { data, selected, selectedRow, rowsPerPage, page ,prediction} = this.state;
    
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.bg_global}>
        <Toolbar className={classes.toolbar_bg}>
      <div className={classes.toolbar_title}>
        {selected.length > 0 ? (
          <Typography
            color="inherit"
            variant="subtitle1"
            className={classes.toolbar_heads}
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography  variant="h5" id="tableTitle" className={classes.toolbar_heads}>
            <b>Invoices</b>
          </Typography>
        )}
        <div className={classes.predict_button}>
          <Button 
          autoid="predict-button"
          variant="contained" className={classes.predictbutton}
          onClick={(event) => this.handle_predict(selectedRow)}
          disabled={(selectedRow.length>0)?false:true}>
            Predict
          </Button>
        </div>
      </div>
    </Toolbar>
    <div className={classes.table_Wrapper}>
          <Table  autoid="invoice-table-collector" className={classes.table}>
          <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handle_SelectAllClick}
              rowCount={data.length}
            />
            <TableBody className={classes.table_body}>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {

               
                  
                      const isSelected = this.isSelected(n.pk_id);
                    return (
                      <TableRow 
                        style={{
                          backgroundColor: "#191c33",
                          color: "#FFFFFFA6",
                          fontSize: "25px",
                        }}
                        hover
                        onClick={(event) => this.handleClick(event, n.pk_id)}
                        role="checkbox"
                        aria-checked={this.isSelected}
                        tabIndex={-1}
                        key={n.pk_id}
                        selected={this.isSelected}
                      >
                      <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        style={{ color: "#ffffff" }}
                      />
                    </TableCell>
                    <TableCell id = 'ci'
                        component="th"
                        scope="row"
                        padding="none"
                        style={{ color: "#ffffff" }}
                      > 
                        {n.company_id}
                      </TableCell>
                      <TableCell id = 'adhi' align="right" style={{ color: "#ffffff" }}>
                        {n.acct_doc_header_id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "#ffffff" }}>
                        {n.document_number}
                      </TableCell>
                      <TableCell  align="right" style={{ color: "#ffffff" }}>
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
                      {this.state.prediction.length !== 0 &&
                        Object.keys(this.state.prediction).indexOf(n.pk_id.toString()) >
                          -1 && parseFloat(
                            this.state.prediction[n.pk_id.toString()].predictions
                           ).toFixed(2)-parseFloat(
                            this.state.prediction[n.pk_id.toString()].actual_open_amount
                           ).toFixed(2)!=0 ? (
                          <TableCell align="right" style={{ color: "white" }}>
                            
                           Partial
                          </TableCell>
                            
                        ) : (
                          <TableCell
                            align="right"
                            style={{ color: "white" }}
                          ></TableCell>
                        )}
                      {this.state.prediction.length !== 0 &&
                        Object.keys(this.state.prediction).indexOf(n.pk_id.toString()) >
                          -1 ? (
                          <TableCell align="right" style={{ color: "white" }}>
                            {parseFloat(
                             this.state.prediction[n.pk_id.toString()].predictions
                            ).toFixed(2)}
                          </TableCell>
                        ) : (
                          <TableCell
                            align="right"
                            style={{ color: "white" }}
                          ></TableCell>
                        )}

                      </TableRow>
                    );
                }
                )
                }
              {emptyRows > 0 && (
                <TableRow style={{ height: 20 * emptyRows , fontSize: "40px", color: "white"}}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          autoid="invoice-table-pagination-collector"
          style={{ backgroundColor: "#252C48", color: "#FFFFFFA6", fontSize: "20px" ,marginTop:"270"}}
          rowsPerPageOptions={[5, 10, 25]}
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
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(Users);