import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Input from "./Input";
import rn from "../fn/module-global";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const ModalContent = props => {
  const [show, setShow] = useState(false);
  let {
    value: valueUsername,
    status: statusUsername,
    changeValue: changeUsername,
    CheckValid: checkUsername,
    setValue: setUsername
  } = Input(value => value.length > 5, "username");

  let {
    value: valuePassword,
    status: statusPassword,
    changeValue: changePassword,
    CheckValid: checkPassword,
    setValue: setPassword
  } = Input(value => value.length > 5);

  let {
    value: valueConfirm,
    status: statusConfirm,
    changeValue: changeConfirm,
    CheckValid: checkConfirm,
    setValue: setConfirm
  } = Input(value => valueConfirm === valuePassword && valueConfirm.length > 5);

  let { value: valueName, status: statusName, changeValue: changeName, CheckValid: checkName, setValue: setName } = Input(
    value => value.length > 5
  );

  let {
    value: valueSurname,
    status: statusSurname,
    changeValue: changeSurname,
    CheckValid: checkSurname,
    setValue: setSurname
  } = Input(value => valueSurname.length > 5);

  let { value: valueEmail, status: statusEmail, changeValue: changeEmail, CheckValid: checkEmail, setValue: setEmail } = Input(
    value => rn.check_format_email(value)
  );

  useEffect(
    () => {
      if (props.status) {
        if (props.form.username !== "" && valueUsername === "") {
          setUsername(props.form.username);
        }
        if (props.form.password !== "" && valuePassword === "") {
          setPassword(props.form.password);
        }
        if (props.form.confirm !== "" && valueConfirm === "") {
          setConfirm(props.form.confirm);
        }
        if (props.form.name !== "" && valueName === "") {
          setName(props.form.name);
        }

        if (props.form.surname !== "" && valueSurname === "") {
          setSurname(props.form.surname);
        }
        if (props.form.email !== "" && valueEmail === "") {
          setEmail(props.form.email);
        }
      }
    },
    [props.status]
  );

  const saveUser = async () => {
    let user = checkUsername();
    let pass = checkPassword();
    let confirm = checkConfirm();
    let name = checkName();
    let surname = checkSurname();
    let email = checkEmail();
    if (user || pass || confirm || name || surname || email) {
      return;
    }
    props.setStatusLoad(true);
    if (props.statusUpdate) {
      let update_res = await axios({
        method: "post",
        url: "http://localhost:4000/update_user",
        data: {
          username: valueUsername,
          password: valuePassword,
          name: valueName,
          surname: valueSurname,
          email: valueEmail,
          id_user: props.form.id_user
        },
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      }).then(success => {
        return success;
      });
      if (update_res.status === 200) {
        props.setStatusLoad(false);
        props.setModal(false);
        changeUsername("", true);
        changePassword("", true);
        changeName("", true);
        changeSurname("", true);
        changeConfirm("", true);
        changeEmail("", true);
        MySwal.fire({
          icon: "success",
          title: update_res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      let add_res = await axios({
        method: "post",
        url: "http://localhost:4000/add_user",
        data: {
          username: valueUsername,
          password: valuePassword,
          name: valueName,
          surname: valueSurname,
          email: valueEmail
        },
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      }).then(success => {
        return success;
      });
      if (add_res.status === 200) {
        props.setStatusLoad(false);
        props.setModal(false);
        changeUsername("", true);
        changePassword("", true);
        changeName("", true);
        changeSurname("", true);
        changeConfirm("", true);
        changeEmail("", true);

        console.log(add_res.data, "success");
        MySwal.fire({
          icon: "success",
          title: add_res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

    //
  };
  const clear = () => {
    props.setForm({
      username: "",
      password: "",
      confirm: "",
      name: "",
      surname: "",
      email: "",
      id_user: null
    });
    setUsername("");
    setPassword("");
    setConfirm("");
    setName("");
    setSurname("");
    setEmail("");
    props.setModal(false);
  };

  return (
    <>
      <Modal show={props.status}>
        <Modal.Header>
          <Modal.Title>เพิ่ม Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-0">
            <div className="col-md-auto fw-bold me-4 d-flex align-items-center" style={{ width: "150px" }}>
              username
            </div>
            <div className="col-md">
              <input
                disabled={props.statusUpdate}
                type="text"
                value={valueUsername}
                onChange={changeUsername}
                className={statusUsername ? "form-control is-invalid" : " form-control "}
              />
              {statusUsername && <div className="invalid-feedback">Please character more 5 And username unique </div>}
            </div>
          </div>

          <div className="row g-0 mt-3">
            <div className="col-md-auto fw-bold me-4 d-flex align-items-center" style={{ width: "150px" }}>
              {" "}
              password{" "}
            </div>
            <div className="col-md">
              <input
                onChange={changePassword}
                value={valuePassword}
                type="password"
                className={statusPassword ? "form-control is-invalid" : " form-control "}
              />
              {statusPassword && <div className="invalid-feedback">Please character more 5</div>}
            </div>
          </div>
          <div className="row g-0 mt-3">
            <div className="col-md-auto fw-bold me-4 d-flex align-items-center" style={{ width: "150px" }}>
              {" "}
              Confirm password{" "}
            </div>
            <div className="col-md">
              <input
                type="password"
                value={valueConfirm}
                onChange={changeConfirm}
                className={statusConfirm ? "form-control is-invalid" : " form-control "}
              />{" "}
              {statusConfirm && <div className="invalid-feedback">Please Confirm password Seem password </div>}
            </div>
          </div>
          <div className="row g-0 mt-3">
            <div className="col-md-auto fw-bold me-4 d-flex align-items-center" style={{ width: "150px" }}>
              {" "}
              name{" "}
            </div>
            <div className="col-md">
              <input
                type="text"
                value={valueName}
                onChange={changeName}
                className={statusName ? "form-control is-invalid" : " form-control "}
              />{" "}
              {statusName && <div className="invalid-feedback">Please character more 5 </div>}
            </div>
          </div>
          <div className="row g-0 mt-3">
            <div className="col-md-auto fw-bold me-4 d-flex align-items-center" style={{ width: "150px" }}>
              {" "}
              surname{" "}
            </div>
            <div className="col-md">
              <input
                type="text"
                value={valueSurname}
                onChange={changeSurname}
                className={statusSurname ? "form-control is-invalid" : " form-control "}
              />{" "}
              {statusSurname && <div className="invalid-feedback">Please character more 5 </div>}
            </div>
          </div>

          <div className="row g-0 mt-3">
            <div className="col-md-auto fw-bold me-4 d-flex align-items-center" style={{ width: "150px" }}>
              {" "}
              email{" "}
            </div>
            <div className="col-md">
              <input
                value={valueEmail}
                onChange={changeEmail}
                type="text"
                className={statusEmail ? "form-control is-invalid" : " form-control "}
              />{" "}
              {statusEmail && <div className="invalid-feedback">Please format Email </div>}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveUser} style={{ width: "100px" }}>
            Save
          </Button>
          <Button variant="secondary" onClick={clear} style={{ width: "100px" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalContent;
