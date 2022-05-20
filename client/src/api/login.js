import axios from "axios";
export const sendLoginReq = async (credentials) => {
  try {
    const res = await axios.post("api/v1/auth/login", credentials);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
