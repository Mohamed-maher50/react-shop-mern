import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Logout() {
  const { getlogedin, CheckAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutLink = async () => {
    const logoutPost = await axios.get("http://localhost:5000/logout");
    console.log(logoutPost);
    if (logoutPost.status == 200) {
      console.log("inside status");
      navigate("/");
      getlogedin();
      CheckAdmin();
    }
    getlogedin();
  };

  return (
    <li className="nav-item" onClick={logoutLink}>
      <Link to={"/"} className="nav-link">
        Log out
      </Link>
    </li>
  );
}

export default Logout;
