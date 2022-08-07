import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Register() {
  const Nabigate = useNavigate();
  const { getlogedin } = useContext(AuthContext);
  const initValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordVerify: "",
  };
  const [data, setData] = useState(initValues);
  const [errors, SetErrors] = useState("");
  const validate = (values) => {
    const formErrors = {};
    const regex = RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const email = String(values.email).toLowerCase();
    const check = email.match(regex);
    console.log(check);

    if (!values.firstName) {
      formErrors.firstName = "First name is required!";
    }
    if (!values.lastName) formErrors.lastName = "Last name is required";
    if (!values.email) {
      formErrors.email = "Email is required";
    }
    if (!values.password && !values.passwordVerify) {
      formErrors.password = "password is required";
    }
    return formErrors;
  };
  const handleValues = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate(data);
    console.log(errs);
    if (Object.keys(errs).length === 0) {
      const PostRegister = await axios
        .post("http://localhost:5000/register", data)
        .then(function (res) {
          Nabigate("/");
          getlogedin();
        })
        .catch((err) => console.log("done"));
      SetErrors({});
    } else {
      SetErrors(errs);
    }
  };

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)} className="my-5 w-50 mx-auto ">
        <legend className="border-bottom border-success border-2 mb-3">
          Register
        </legend>
        <div className="d-flex row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              type={"text"}
              placeholder={"First Name"}
              className=" form-control"
              name="firstName"
              onChange={(e) => handleValues(e)}
              value={data.firstName}
            />
            <pre
              className={`alert my-1 ${errors.firstName ? "alert-danger" : ""}`}
            >
              {errors.firstName}
            </pre>
          </div>
          <div className="col">
            <label className="form-label" htmlFor="LastName">
              Last Name
            </label>
            <input
              id="LastName"
              type={"text"}
              className="form-control"
              placeholder={"Last Name"}
              name="lastName"
              onChange={(e) => handleValues(e)}
              value={data.lastName}
            />
            <pre
              className={`alert my-1 ${errors.lastName ? "alert-danger" : ""}`}
            >
              {errors.lastName}
            </pre>
          </div>
        </div>

        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            className="form-control"
            placeholder={"Enter You Email"}
            name="email"
            onChange={(e) => handleValues(e)}
            value={data.email}
          />
          <pre className={`alert my-1 ${errors.email ? "alert-danger" : ""}`}>
            {errors.email}
          </pre>
        </div>
        <div className="my-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type={"password"}
            id="Password"
            value={data.password}
            placeholder={"Enter You Password"}
            name={"password"}
            onChange={(e) => handleValues(e)}
            className="form-control"
          />
          <pre
            className={`alert my-1 ${errors.password ? "alert-danger" : ""}`}
          >
            {errors.password}
          </pre>
        </div>

        <div className="my-3">
          <label htmlFor="verifyPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type={"password"}
            id="verifyPassword"
            onChange={(e) => handleValues(e)}
            placeholder={"Enter You Password"}
            name={"passwordVerify"}
            className="form-control"
            value={data.passwordVerify}
          />
        </div>

        <div className={`error ${errors.password ? "alert alert-danger" : ""}`}>
          {errors.password == undefined ? "" : errors.password}
        </div>

        <button type="submit" className="btn btn-outline-success">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
