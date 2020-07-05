import React, { Component, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";

import "./styles.css";

class App extends Component {
  goToEditBriefForm = props => <RouterLink to="/edit-brief" {...props} />;

  render() {
    const { classes, title, location } = this.props;
    const columns = ["Name", "Company", "City", "State"];

    const data = [
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"]
    ];
    const options = {
      filterType: "checkbox",
      onRowClick: rowData => this.goToEditBriefForm(rowData),
      //I want to onRowClick, the function goToEditBriefForm(rowData) gets called (see line 9) and the data will be passed through.
      //But so far, when a row is clicked nothing happens, but if I replace line 23 with line 26, it console logged out my data for that row.
      onRowClick: rowData => console.log(rowData)
    };
    return (
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
t