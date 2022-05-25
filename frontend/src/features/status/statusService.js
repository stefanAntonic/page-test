import axios from "axios";

const API = "/api/status/";

//Povlaci kurseve iz baze
const getStatus = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API, config);
    return response.data;
  };

  const statusService = {
    getStatus
    
  };

  export default statusService
