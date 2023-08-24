import React from "react";
import { connect } from "react-redux";
import { selectMonth, addUser } from "../redux/actions";
import { TextField } from "@mui/material";

export default connect()(function Month(props) {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [isPrevShow, setIsPrevShow] = useState();
  function closeSignUpModal() {
    setIsPrevShow();
    handleClose();
  }
  return (
    <>
      <div>
        <div>
          <h1>Welcome!</h1>
          <h2>we allmost done</h2>
          <p>
            In order to start tracking and building an action plan we will have
            to fill in some more details regarding expenses and income and of
            course your goals
          </p>
        </div>

        <div>
          <div>
            <h2>Targets</h2>
            <p>Let's start by fulfilling your goals</p>
            <TextField
              id="outlined-name-input"
              label="Goal Name"
              type="text"
              autoComplete="current-firstname"
              inputRef={targetNameRef}
            />
            <TextField
              id="outlined-sum-input"
              label="target Sum"
              type="number"
              autoComplete="current-firstname"
              inputRef={sumRef}
            />
            <TextField
              id="outlined-date-input"
              label="Goal Date"
              type="date"
              autoComplete="current-firstname"
              inputRef={GoalDateRef}
            />
             <TextField
              id="outlined-amount-input"
              label="Accumulated amount"
              type="number"
              autoComplete="current-firstname"
              inputRef={amountRef}
            />
          </div>
          <div>Expenses</div>
          <div>Insertions</div>
        </div>
      </div>
    </>
  );
});
