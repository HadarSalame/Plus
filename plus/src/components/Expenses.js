import { React, useEffect, useState } from "react";
import "./CSS/ChartsCss.css";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChartEx from "./Charts/ExpensesChart";
import { connect } from "react-redux";
import { addExpense } from "../redux/actions";
import NewExpense from "./Add";

function mapStateToProps(state) {
  return {
    month: state.Month.month,
    exp: state.Expenses.expense,
  };
}

export default connect(mapStateToProps)(function Expenses(props) {
  const { month, dispatch } = props;
  console.log("mon", month);

  const [newExpShow, setNewExpShow] = useState();
  function closeNewExpModal() {
    setNewExpShow(false);
  }

  const [exp, setexp] = useState();

  const id = month[0];
  useEffect(() => {
    axios
      .get(`http://localhost:3030/api/v1/expense/getAll/${id}`)
      .then((res) => {
        if (res.data) {
          console.log("res", res.data);
          setexp(res.data);
          console.log("all", exp);
        } else {
          console.log("its not working");
        }
      });
  }, []);

  function DeleteExp(id) {
    console.log("delete id", id);
    axios.delete(`http://localhost:3030/api/v1/expense/${id}`).then((res) => {
      if (res.data) {
        console.log("delete");
      } else {
        console.log("cant delete");
      }
    });
  }

  return (
    <>
      <div>
        <h1>Expenses</h1>
        <h2>Month:{month.mon}</h2>
        {/* fillter */}
        <Button
          variant="outline"
          className="btn send"
          style={{ justifyContent: "center" }}
          onClick={setNewExpShow}
        >
          Add new expense
        </Button>
        {newExpShow && (
          <NewExpense show={newExpShow} setShow={closeNewExpModal} />
        )}
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Kind </TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exp ? (
                  exp.map((row, index) => (
                    <>
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.date}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
                        <TableCell align="right">{row.ex_fixed} </TableCell>
                        <TableCell align="right">{row.sum}</TableCell>
                        <TableCell align="right">
                          <EditIcon className="Icon" />
                        </TableCell>
                        <TableCell align="right">
                          <DeleteIcon
                            className="Icon"
                            onClick={() => {
                              DeleteExp(row._id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <div></div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>{/* <ChartEx /> */}</div>
      </div>
      <div className="charts_side">
        <ChartEx/>
      </div>
    </>
  );
});
