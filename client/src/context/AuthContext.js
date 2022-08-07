import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
function AuthContextProvider(props) {
  const [logedin, setLogedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [card, setCard] = useState([]);
  const CheckAdmin = async () => {
    const res = await axios
      .get("http://localhost:5000/admin")
      .then((res) => {
        setIsAdmin(res.data);
      })
      .catch((err) => {
        setIsAdmin(err.response.data);
      });
  };
  async function getlogedin() {
    const logedinRes = await axios
      .get("http://localhost:5000/logedin", {
        withCredentials: true,
      })
      .then((res) => {
        setLogedin(res.data);
      })
      .catch((err) => {
        setLogedin(err.response.data);
      });
  }
  useEffect(() => {
    getlogedin();
    CheckAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ logedin, getlogedin, isAdmin, CheckAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
