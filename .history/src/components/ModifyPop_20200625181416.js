import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

class ModifyPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open_amount: this.props.data.actual_open_amount,
      doctype: this.props.data.doctype,
      open_amount_old: this.props.data.actual_open_amount,
      doctype_old: this.props.data.doctype,
      id: this.props.data.document_number,
      open: true,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangeOpenAmount = (e) => {
    this.setState({
      open_amount: e.target.value,
    });
  };

  handleChangeDoctype = (e) => {
    this.setState({
      doctype: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };
  handleCloseSubmit = () => {
    this.updateTable(
      this.state.open_amount,
      this.state.doctype,
      this.state.id
    );
    this.setState({ open: false });
    this.props.onClose();
  };

  updateTable(open_amount, doctype, id) {
    Axios.get('http://localhost:8080/1706431/ModifyTable', {params: {'actual_open_amount': open_amount, 'doctype': doctype, 'id': id}})
    .catch(e => console.log(e))
  }

  render() {
      console.log(this.state);
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{ style: { backgroundColor: "#252C48" } }}
      >
        <DialogTitle id="form-dialog-title">
          <div style={{ color: "white" }}>Modify</div>
        </DialogTitle>
        <DialogContent>
          <TextField
          autoid="open-amount-input"
            id="filled-full-width"
            label="Open Amount"
            placeholder="Edit"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{
              style: { color: "white" },
            }}
            value={this.state.open_amount}
            onChange={this.handleChangeOpenAmount}
            variant="filled"
          />
          <TextField
          autoid="doctype-input"
            id="filled-full-width"
            label="Doctype"
            placeholder="Edit"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{
              style: { color: "white" },
            }}
            value={this.state.doctype}
            onChange={this.handleChangeDoctype}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            style={{ color: "#90a4ae", borderColor: "#90a4ae" }}
            variant="outlined"
          >
            Cancel
          </Button>

          {(this.state.open_amount_old == this.state.open_amount ||
            this.state.open_amount == "") &&
          (this.state.doctype == this.state.doctype_old ||
            this.state.doctype == "") ? (
            <Button
              onClick={this.handleCloseSubmit}
              style={{ color: "#9e9e9e" }}
              variant="contained"
              disabled
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={this.handleCloseSubmit}
              style={{ color: "white", backgroundColor: "#0091ea" }}
              variant="contained"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default (ModifyPop);
