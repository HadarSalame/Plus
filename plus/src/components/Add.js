import axios from "axios";
import { React, useState, useRef } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { updateMonth } from "../redux/actions";
import {
  FormControlLabel,
  Radio,
  TextField,
  RadioGroup,
  Button,
  FormControl,
  InputLabel,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import "./CSS/AddExp.css";

function mapStateToProps(state) {
  return {
    mon: state.Month.month,
    usr: state.User.user,
  };
}

export default connect(mapStateToProps)(function AddExpense(props) {
  const { mon, dispatch } = props;
  console.log("mon111",mon);
  const { show, setShow } = props;
  const handleCloseExp = () => {
    setShow(false);
  };
  const handleShowExp = () => setShow(true);

  // const [expCategory, setExpCategory] = useState("");

  const [expCategory, setExpCategory] = useState("");

  const handleChangeCategory = (event) => {
    console.log(event);
    setExpCategory(event);
  };
  // const [expFixed, setExpFixed] = useState(false);

  const [selectedValue, setselectedValue] = useState(true);
  const handleChangeValue = (event) => {
    console.log(event.target.value);
    setselectedValue(event.target.value);
  };

  let exp_sum = useRef();
  let exp_name = useRef();
  // const [exp_sum, setExp_sum] = useState();

  function addExpense() {
    console.log(exp_name);
    let exp_object = {
      month: mon,
      name: exp_name.current.value,
      category: expCategory.target.value,
      ex_fixed: selectedValue,
      ex_sum: exp_sum.current.value,
    };
    console.log(exp_object);
    axios
      .post("http://localhost:3030/api/v1/expense", exp_object)
      .then((res) => {
        if (!res.data) {
          // handleShowErrorAlertExist();
        } else {
          console.log("new_exp", exp_object);
          updateMonth(res.data.ex_sum);
          handleCloseExp();
        }
      });
  }
  return (
    <>
      <div>
        <Box>
          <Modal show={show} onHide={handleShowExp}>
            <Modal.Header>
              <h1>New Expenses</h1>
            </Modal.Header>
            <Modal.Body className="modal_body">
              <TextField
                id="outlined-firstname-input"
                label="Expense name"
                type="text"
                autoComplete="current-Expensename"
                inputRef={exp_name}
              />
              <TextField
                id="outlined-sum-input"
                label="Sum"
                type="number"
                autoComplete="current-sum"
                inputRef={exp_sum}
              />
              <Select
                className="select"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                onChange={handleChangeCategory}
              >
                <MenuItem value={"Insurance"}>Insurance</MenuItem>
                <MenuItem value={"Medicine and cosmetics"}>
                  Medicine and cosmetics
                </MenuItem>
                <MenuItem value={"Municipality and government"}>
                  Municipality and government
                </MenuItem>
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Different"}>Different</MenuItem>
              </Select>
              <div>
                {/* <Radio
                  style={{ color: "#7ed957" }}
                  checked={selectedValue === true}
                  onChange={handleChangeValue}
                  value={true}
                  name="isFixed"
                  label="Yes"
                
                />
                <Radio
                  style={{ color: "#7ed957" }}
                  checked={selectedValue === false}
                  onChange={handleChangeValue}
                  value={false}
                  name="isFixed"
                  inputProps={{ "aria-label": "No" }}
                  label="No"
                /> */}
                <RadioGroup
                  name="radio-buttons-group"
                  row
                  value={selectedValue}
                  onChange={handleChangeValue}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn" onClick={addExpense}>
                Add
              </Button>
              <Button className="btn" onClick={handleCloseExp}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Box>
      </div>
    </>
  );
});

// connect()(function AddInsertion(props) {
//   return <></>;
// });
// connect()(function AddTarget(props) {
//   return <></>;
// });
