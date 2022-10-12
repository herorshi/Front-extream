import React, { useState } from "react";
import axios from "axios";
let checkString = null;
const Input = (fn, username = "") => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(false);

  const changeValue = (event, statusClear = false) => {
    if (username === "username") {
      if (statusClear) {
        setValue("");
        setStatus(false);
        return;
      }
      if (checkString) {
        clearInterval(checkString);
      }
      setValue(event.target.value);
      if (event.target.value.length > 5) {
        checkString = setTimeout(async () => {
          let checkUser = await axios({
            method: "post",
            url: "http://localhost:4000/check_user",
            data: { username: event.target.value },
            headers: { Accept: "application/json", "Content-Type": "application/json" }
          }).then(success => {
            return success;
          });
          if (checkUser.status === 200) {
            if (checkUser.data.status === 400) {
              setStatus(true);
            } else {
              setStatus(false);
            }
          }
        }, 1000);
      }
    } else {
      if (statusClear) {
        setValue("");
        setStatus(false);
      } else {
        setStatus(false);
        setValue(event.target.value);
      }
    }
  };
  function CheckValid(valid) {
    const ck = fn(value);
    setStatus(!ck);
    return !ck;
  }
  function UsernameStatus(valueStatus) {
    setStatus(valueStatus);
    return valueStatus;
  }
  return {
    value,
    status,
    changeValue,
    CheckValid,
    UsernameStatus,
    setValue
  };
};

export default Input;
