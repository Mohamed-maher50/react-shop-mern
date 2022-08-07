import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { getlogedin, CheckAdmin } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleValues = (e) => {
    if (e.target.type == "email") {
      setData({
        email: e.target.value,
        password: data.password,
      });
    }
    if (e.target.type == "password") {
      setData({
        email: data.email,
        password: e.target.value,
      });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log("send");
    const postLogin = await axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        navigate("/");
        getlogedin();
        CheckAdmin();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <form onSubmit={(e) => handleForm(e)} className="w-25 mx-auto my-5">
        <legend className=" border-bottom border-success border-3 mb-4">
          Login
        </legend>
        <div className="my-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type={"email"}
            placeholder={"Enter Your Email"}
            onChange={(e) => handleValues(e)}
            value={data.email}
            className="form-control "
            id="email"
          />
        </div>
        <div className="my-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type={"password"}
            placeholder={"Enter You Password"}
            className="form-control"
            onChange={(e) => handleValues(e)}
            value={data.password}
          />
        </div>

        <button type={"submit"} className="btn btn-outline-success btn-md ">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
