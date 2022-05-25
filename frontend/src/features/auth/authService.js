//  Ovdje se pravi http request
import axios from "axios";

// url za registraciju korisnika
const API = "/api/user/"; // u package.json podesen proxy 

//Registracija korisnika
const register = async (userData) => {
  const response = await axios.post(API, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Odjava korisnika
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("info");
  localStorage.removeItem("edit");

};

//Prijava korisnika
const login = async (userData) => {
    const response = await axios.post(API + 'login', userData);
    console.log(response);
  
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  
    return response.data;
  };
  

const authService = {
  register,
  logout,
  login,
};

export default authService;
