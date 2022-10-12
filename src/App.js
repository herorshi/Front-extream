import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./App.css";
import rn from "./fn/module-global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalContent from "./components/Modal";
import Input from "./components/Input";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
let searchTime = null;
function App() {
  const [storeUser, setStoreUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [statusLoad, setStatusLoad] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    name: "",
    surname: "",
    email: "",
    id_user: null
  });
  const [search, setSearch] = useState("");
  const loadUser = useCallback(
    async () => {
      if (statusLoad) {
        if (search !== "") {
          let user = await axios({
            method: "post",
            url: "http://localhost:4000/search_user",
            data: { search: search },
            headers: { Accept: "application/json", "Content-Type": "application/json" }
          }).then(success => {
            return success;
          });
          if (user.status === 200) {
            setStoreUser(user.data.data);
            setStatusLoad(false);
          }
        } else {
          let user = await axios({
            method: "get",
            url: "http://localhost:4000/api",
            headers: { Accept: "application/json", "Content-Type": "application/json" }
          }).then(success => {
            return success;
          });
          if (user.status === 200) {
            setStoreUser(user.data.data);
            setStatusLoad(false);
          }
        }
      }
    },
    [statusLoad]
  );
  const addUser = () => {
    setModal(true);
    setStatusUpdate(false);
  };
  const updateUser = value => {
    setStatusUpdate(true);
    setForm(value);
    setModal(true);
  };
  const deleteUserFn = async value => {
    MySwal.fire({
      title: "ยืนยันลบข้อมูล",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "yes"
    }).then(async result => {
      if (result.isConfirmed) {
        setStatusLoad(false);
        let delete_res = await axios({
          method: "post",
          url: "http://localhost:4000/delete_user",
          data: { id_user: value },
          headers: { Accept: "application/json", "Content-Type": "application/json" }
        }).then(success => {
          return success;
        });

        if (delete_res.status === 200) {
          setStatusLoad(true);
        }
        MySwal.fire({
          icon: "success",
          title: delete_res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    return;
  };
  const searchData = event => {
    if (searchTime) {
      clearInterval(searchTime);
    }
    searchTime = setTimeout(() => {
      setStatusLoad(true);
      setSearch(event.target.value);
    }, 500);
  };

  useEffect(
    () => {
      loadUser();
    },
    [loadUser, search]
  );
  return (
    <>
      <ModalContent
        form={form}
        status={modal}
        setModal={setModal}
        setStatusLoad={setStatusLoad}
        statusUpdate={statusUpdate}
        setForm={setForm}
      />

      <div className="container mt-4">
        <div className="table">
          <div className="d-flex ">
            <input type="text" placeholder="search" onChange={searchData} className="form-control w-200-px mb-4 me-auto" />
            <button onClick={() => addUser()} className="btn btn-success" style={{ height: "38px", width: "130px" }}>
              เพิ่ม User
            </button>
            {/* <button onClick={() => setStatusLoad(true)}>status</button> */}
          </div>
          {/* {JSON.stringify(storeUse).toString()} */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-center" scope="col">
                  username
                </th>
                <th className="text-center" scope="col">
                  name
                </th>
                <th className="text-center" scope="col">
                  surname
                </th>
                <th className="text-center" scope="col">
                  email
                </th>
                <th className="text-center" scope="col">
                  create Time
                </th>
                <th className="text-center" scope="col">
                  update Time
                </th>
                <th className="text-center" scope="col">
                  update
                </th>
                <th className="text-center" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {storeUser.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-light bg-secondary">
                    {" "}
                    No Data{" "}
                  </td>
                </tr>
              )}
              {storeUser.map((content, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{content.username}</td>
                    <td className="text-center">{content.name}</td>
                    <td className="text-center">{content.surname}</td>
                    <td className="text-center">{content.email}</td>
                    <td className="text-center">{rn.DateCoverRevers(new Date(content.created_date), true, false, "/")}</td>
                    <td className="text-center">{rn.DateCoverRevers(new Date(content.update_date), true, false, "/")}</td>
                    <td className="text-center" style={{ fontSize: "20px" }}>
                      <FontAwesomeIcon
                        onClick={() =>
                          updateUser({
                            username: content.username,
                            password: content.password,
                            confirm: content.password,
                            name: content.name,
                            surname: content.surname,
                            email: content.email,
                            id_user: content.id_user
                          })
                        }
                        className="a-click"
                        icon={faPen}
                      />
                    </td>
                    <td className="text-center" style={{ fontSize: "20px" }}>
                      <FontAwesomeIcon onClick={() => deleteUserFn(content.id_user)} className="a-click" icon={faTrash} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
