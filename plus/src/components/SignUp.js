import React, { useRef, useState } from "react";
import "./CSS/SignUpCss.css";
import {
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Stack, AlertTitle, TextField,Button } from "@mui/material";
import { connect } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import Close from "@mui/icons-material/Close";
import { selectMonth, addUser } from "../redux/actions";


function mapStateToProps(state) {
  return {
      usr: state.User.user
  }
}

export default connect(mapStateToProps)(function SignUp(props) {
  const { usr,dispatch } = props;

  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [islogInShow, setIslogInShow] = useState();
  function closeSignUpModal() {
    setIslogInShow();
    handleClose();
  }

  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let phoneRef = useRef();
  let emailRef = useRef();
  let passRef = useRef();

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleCloseErrorAlert = () => setShowErrorAlert(false);
  const handleShowErrorAlert = () => setShowErrorAlert(true);

  const [showErrorAlertPass, setShowErrorAlertPass] = useState(false);
  const handleCloseErrorAlertPass = () => setShowErrorAlertPass(false);
  const handleShowErrorAlertPass = () => setShowErrorAlertPass(true);

  const [showErrorAlertExist, setShowErrorAlertExist] = useState(false);
  const handleCloseErrorAlertExist = () => setShowErrorAlertExist(false);
  const handleShowErrorAlertExist = () => setShowErrorAlertExist(true);

  let navigate = useNavigate();
  function SignUp() {
    let newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phone: phoneRef.current.value,
      mail: emailRef.current.value,
      password: passRef.current.value,
    };
    console.log(newUser);
    if (
      newUser.password !== " " &&
      newUser.firstName !== " " &&
      newUser.lastName !== " " &&
      newUser.phone !== " " &&
      newUser.mail !== " "
    ) {
      axios
        .post("http://localhost:3030/api/v1/user", newUser)
        .then((res) => {
          if (!res.data) {
            handleShowErrorAlertExist();
          } else {
            let userid =res.data._id;
           autoMonth(userid)
            dispatch(addUser(res.data));
            //הסרת כפתורי ההתחברות וההרשמה ולשים כפתור התנתקות ושלום למשתמש
            handleClose();
          }
        })
        .catch((err) => console.log(err));
    } else {
      handleShowErrorAlert();
    }
  }
  function autoMonth(userid) {
    let usr={
      user:userid
    }
    axios
    .post("http://localhost:3030/api/v1/month", usr)
    .then((response) => {
      if (response.data) {
        console.log("month to check", response.data);
        dispatch(selectMonth(response.data));
      }
      alert("error");
    });
  }

  function CloseSignUp() {}
  return (
    <>
      <div>
        <Modal>
          <Modal.Header>
            <Close onClick={handleClose} style={{ direction: "ltr" }} />
            <h1 style={{ textAlign: "center" }}>SignUp</h1>
          </Modal.Header>
          <Modal.Body>
            <Modal show={showErrorAlert} onHide={handleCloseErrorAlert}>
              <Modal.Body className="alertModal">
                <CancelIcon sx={{ color: "#cb2121cc", fontSize: "106px" }} />
                <br></br>

                <h3 style={{ direction: "rtl" }}>שגיאה!</h3>
                <h5> יש למלא את כל הפרטים</h5>

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
            <Modal show={showErrorAlertPass} onHide={handleCloseErrorAlertPass}>
              <Modal.Body className="alertModal">
                <CancelIcon sx={{ color: "#cb2121cc", fontSize: "106px" }} />
                <br></br>

                <h3 style={{ direction: "rtl" }}>שגיאה!</h3>
                <h5> הסימאות אינן זהות</h5>

                <Button
                  variant="primary"
                  className="btn"
                  style={{
                    alignItems: "center",
                    marginTop: "3% ",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                  onClick={handleCloseErrorAlertPass}
                >
                  סגור
                </Button>
              </Modal.Body>
            </Modal>
            <Modal
              show={showErrorAlertExist}
              onHide={handleCloseErrorAlertExist}
            >
              <Modal.Body className="alertModal">
                <CancelIcon sx={{ color: "#cb2121cc", fontSize: "106px" }} />
                <br></br>

                <h3 style={{ direction: "rtl" }}>שגיאה!</h3>
                <h5> המשתמש קיים במערכת</h5>

                <Button
                  variant="primary"
                  className="btn"
                  style={{
                    alignItems: "center",
                    marginTop: "3% ",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                  onClick={handleCloseErrorAlertExist}
                >
                  סגור
                </Button>
              </Modal.Body>
            </Modal>
            <br></br>
            <div>
              {/* name */}
              <Form>
                <FloatingLabel
                  className="mb-3 "
                  style={{ direction: "rtl" }}
                  controlId="floatingInputName"
                  label="first name"
                >
                  <Form.Control
                    ref={firstNameRef}
                    type="Text"
                    placeholder="name"
                  />
                </FloatingLabel>

                {/* lastname */}
                <FloatingLabel
                  className="mb-3"
                  style={{ direction: "rtl" }}
                  controlId="floatingInputlastName"
                  label="last name "
                >
                  <Form.Control
                    ref={lastNameRef}
                    type="Text"
                    placeholder="lastName"
                  />
                </FloatingLabel>

                {/* phone */}
                <FloatingLabel
                  className="mb-3"
                  style={{ direction: "rtl" }}
                  controlId="floatingInputPhone"
                  label="phone number"
                >
                  <Form.Control
                    ref={phoneRef}
                    type="phone"
                    placeholder="phone"
                  />
                </FloatingLabel>

                {/* email */}
                <FloatingLabel
                  className="mb-3"
                  style={{ direction: "rtl" }}
                  controlId="floatingInputEmail"
                  label="E-mail"
                >
                  <Form.Control
                    ref={emailRef}
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                {/* password */}
                <FloatingLabel
                  className="mb-3"
                  style={{ direction: "rtl" }}
                  controlId="floatingPassword"
                  label="סיסמה"
                >
                  <Form.Control
                    ref={passRef}
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button
                value="SignUpBtn"
                variant="outline"
                className="btn"
                onClick={SignUp}
              >
                SignUp
              </Button>
              <Button
                value="SignUpBtn"
                variant="outline"
                className="btn"
                onClick={setIslogInShow}
              >
                Already have an account?
              </Button>
              {islogInShow && (
                <logIn show={islogInShow} setShow={closeSignUpModal} />
              )}
            </div>
          </Modal.Footer>
        </Modal>
      </div>

      <Modal show={show} onHide={handleShow} className="modal">
        <Modal.Header>
          <Close onClick={handleClose} style={{ direction: "ltr" }} />
          <Modal.Title>
            <h1 style={{ margin: 0 }}>SignUp</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Accordion> */}
            <TextField
              id="outlined-firstname-input"
              label="First name"
              type="text"
              autoComplete="current-firstname"
              inputRef={firstNameRef}
            />
            <TextField
              id="outlined-lastname-input"
              label="Last name"
              type="text"
              autoComplete="current-lastname"
              inputRef={lastNameRef}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              inputRef={emailRef}
            />
            <TextField
              id="outlined-phone-input"
              label="Phone"
              type="text"
              autoComplete="current-phone"
              inputRef={phoneRef}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={passRef}
            />
          {/* </Accordion> */}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn send" value="SignUpBtn" onClick={SignUp}>
            Next
          </Button>
          <Button className="btn ref_btn">have an a count?</Button>
        </Modal.Footer>
      </Modal>

      {/* <div>
        <Modal
          keepMounted
          open={show}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >

        <Box>

        </Box>
        </Modal>
      </div> */}
    </>
  );
});
