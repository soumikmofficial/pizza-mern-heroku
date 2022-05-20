import axios from "axios";

export const deleteReview = async (url) => {
  try {
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
