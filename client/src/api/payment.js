import axios from "axios";

export const getOrder = async (payload) => {
  try {
    const res = await axios.post(`api/v1/payment/create-order`, payload);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getPaymentDetails = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
