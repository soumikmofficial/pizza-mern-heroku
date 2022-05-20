import axios from "axios";
export const registerUser = async (inputs) => {
  try {
    const res = await axios.post("api/v1/auth/register", inputs);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
