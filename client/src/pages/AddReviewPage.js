import React, { useEffect, useState } from "react";
import {
  Container,
  FormWrapper,
  Form,
  Error,
  errorVariants,
} from "./UpdateReviewPage";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideModal } from "../features/pizzas/pizzaSlice";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {
    y: "-100%",
  },
  visible: {
    y: 0,
  },
  exit: {
    x: "100%",
  },
};

const AddReviewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    comment: "",
    rating: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/v1/reviews`, {
        product: id,
        ...inputs,
      });
      if (data.status === "failed") {
        setError(data.message);
      }
      setLoading(false);
      navigate("/menu");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(hideModal());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  return (
    <Container
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <AnimatePresence>
        {error && (
          <Error
            variants={errorVariants}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            {error}
          </Error>
        )}
      </AnimatePresence>

      <FormWrapper>
        <h2>Add Review</h2>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputs.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              name="rating"
              id="rating"
              defaultValue={inputs.rating}
              onChange={(e) =>
                setInputs({ ...inputs, rating: Number(e.target.value) })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              id="comment"
              value={inputs.comment}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <button
            type="submit"
            className={loading ? "loading" : ""}
            disabled={loading}
          >
            {loading ? "adding..." : "submit"}
          </button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AddReviewPage;
