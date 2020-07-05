import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
class Example extends React.Component {
  render() {
    const columns = ["Name", "Title"];

    const data = [
      ["Gabby George", "Business Analyst"],
      ["Aiden Lloyd", "Business Consultant"],
      ["Jaden Collins", "Attorney"],
      ["Franky Rees", "Business Analyst"],
      ["Aaren Rose", "Business Consultant"]
    ];

    const options = {
      filterType: "checkbox",
      selectableRows: "multiple",
      selectableRowsOnClick: true,
      rowsSelected: [0, 1, 2]
    };

    return (
      <MUIDataTable
        title="ACME Employee list"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
