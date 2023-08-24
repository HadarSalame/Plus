import { React, useRef, useState } from "react";
import "./CSS/LoginCss.css";
import axios from "axios";
import Close from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { addUser, signhoutUser, selectMonth } from "../redux/actions";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import CancelIcon from "@mui/icons-material/Cancel";
import SignUp from "./SignUp";
import { TextField,Button } from "@mui/material";

export default connect()(function Login(props) {
  const { dispatch } = props;

  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleCloseErrorAlert = () => setShowErrorAlert(false);
  const handleShowErrorAlert = () => setShowErrorAlert(true);

  let emailRef = useRef();
  let passRef = useRef();
  function log_in() {
    console.log(emailRef, passRef);
    axios
      .get(
        `http://localhost:3030/api/v1/user/${emailRef.current.value}/${passRef.current.value}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === "null" || res.data === "undefined") {
          console.log('error');
          handleShowErrorAlert();
        } else {
          dispatch(addUser(res.data));
          dispatch(signhoutUser(false));
          dispatch(selectMonth(res.data.monthly));
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [isSignUpShow, setIsSignUpShow] = useState();
  function closeLoginModal() {
    setIsSignUpShow();
  }

  return (
    <>
      <div>
        <Modal show={show} onHide={handleShow}>
          <Modal.Header>
            <Close onClick={handleClose} style={{ direction: "ltr" }} />
            <h1 style={{ textAlign: "center" }}>LogIn </h1>
            <Modal show={showErrorAlert} onHide={handleCloseErrorAlert}>
              <Modal.Body className="alertModal">
                <CancelIcon sx={{ color: "#cb2121cc", fontSize: "106px" }} />
                <br></br>

                <h3 style={{ direction: "rtl" }}>Error!</h3>
                <h5>The details are incorrect, try again</h5>

                <Button
                  variant="primary"
                  className="btn"
                  style={{
                    alignItems: "center",
                    marginTop: "3% ",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                  onClick={handleCloseErrorAlert}
                >
                  סגור
                </Button>
              </Modal.Body>
            </Modal>
          </Modal.Header>
          <Modal.Body className="modal_details">
            <div>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              inputRef={emailRef}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={passRef}
            />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button
                variant="outline"
                className="btn send"
                style={{ justifyContent: "center" }}
                onClick={log_in}
              >
                LogIn
              </Button>

              <Button
                variant="outline"
                className="btn ref_btn"
                style={{ justifyContent: "center" }}
                onClick={closeLoginModal}
              >
                dont have a count?
              </Button>

              {isSignUpShow && (
                <SignUp show={isSignUpShow} setShow={closeLoginModal} />
              )}
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
});
