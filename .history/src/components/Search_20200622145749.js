import React, { Component } from "react";
import theme, { pxToVh } from '../utils/theme';
import { Card, CardContent, Paper, Table, TableHead, TableBody, TableCell, TableRow, Typography, InputBase} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Axios from "axios";

const styles = (theme) => ({
  card: {
    backgroundColor: "#252C48",
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    backgroundColor: "#252C48",
    overflow: "auto",
    height: 210,
  },
  table: {
    minWidth: "90%",
    backgroundColor: "#252C48",
  },
  tableHeader: {
    padding: "5px 5px 5px 15px",
    color: "#fff",
  },
  textColor: {
    color: "#fff !important",
  },
  input: {
    width: "100%",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius * 5,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
      data: [],
    };
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchSearchAll() {
    Axios.get('http://localhost:8080/1706431/SimpleSearchAll')
      .then((res) => this.setState({ data : res.data})
  ).catch(e => console.log(e))
}


  fetchSearch(query) {
      Axios.get('http://localhost:8080/1706431/SimpleSearch', {params: {"search" : query}})
        .then((res) => this.setState({ data : res.data})
    ).catch(e => console.log(e))
  }

  handleSearchChange = (e) => {
    this.setState({ searchVal: e.target.value });
  };

  keyPressEnter = (e) => {
    if (e.keyCode === 13) {
      this.fetchSearch(this.state.searchVal);
      
    }
    else
    {
      this.fetchSearchAll();
    }
   
  };

  componentWillMount() {
    this.fetchSearchAll()
   // this.fetchSearch();
  }

  render() {
    const { classes } = this.props;
    const { searchVal } = this.state;
    const searchData = this.state.data;
    return (
      <Card className={classes.card}>
        <CardContent>
          {/*<input
            type="text"
            placeholder="Search by customer name or customer number"
            className={classes.input}
            value={searchVal}
            onChange={this.handleSearchChange}
            onKeyDown={this.keyPressEnter}
          />*/}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{ color: "white" }} />
            </div>
            <InputBase
              placeholder="Search by customer name or customer number"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchVal}
              onChange={this.handleSearchChange}
              onKeyDown={this.keyPressEnter}
              style={{
                fontSize: "12px",
                width: "100%",
                color: "white",
              }}
            />
          </div>
          <br/>
          <br/>
          <br/>
          <Paper className={classes.root} elevation={0} style={{ marginTop:"-10%"}}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.textColor}>
                    Customer Name
                  </TableCell>
                  <TableCell className={classes.textColor}>
                    Customer Number
                  </TableCell>
                  <TableCell className={classes.textColor}>
                    Open Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchData.map((d, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className={classes.textColor}>
                        <Link
                          className={classes.link}
                          to={`/customer-dashboard/${d.customer_number}/${d.customer_name}`}>
                          {d.customer_name}
                        </Link>
                      </TableCell>
                      <TableCell className={classes.textColor}>
                        {d.customer_number}
                      </TableCell>
                      <TableCell className={classes.textColor}>
                        {d.actual_open_amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: false })(Search);

