import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideModal } from "../features/pizzas/pizzaSlice";
import { AnimatePresence, motion } from "framer-motion";

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

export const errorVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0,
  },
};

const UpdateReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    comment: "",
    rating: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.patch(`/api/v1/reviews/${id}`, inputs);
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
    const fetchReview = async () => {
      try {
        const {
          data: { review },
        } = await axios.get(`/api/v1/reviews/${id}`);
        const { title, rating, comment } = review;
        setInputs({ title, rating, comment });
        setFetching(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchReview();
    dispatch(hideModal());
  }, [dispatch, id]);

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
      key={id}
    >
      {fetching ? (
        <h1>Fetching review...</h1>
      ) : (
        <>
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
            <h2>Update Review</h2>
            <Form onSubmit={handleSubmit}>
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
                {loading ? "updating..." : "update"}
              </button>
            </Form>
          </FormWrapper>
        </>
      )}
    </Container>
  );
};

export default UpdateReviewPage;

export const Container = styled(motion.div)`
  height: 90vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 3rem 0;
  }
`;

export const FormWrapper = styled.div`
  width: clamp(60rem, 50%, 80rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Form = styled.form`
  background: var(--col-pizza-grey);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 5rem 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-form);
  @media (max-width: 768px) {
      width: 95%;
      margin: 0 auto;
    }
  .form-group {
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1rem;
    }
    label {
      flex: 0.15;
      font-size: 1.4rem;
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
      input,
      textarea {
        border-radius: var(--border-radius);
        flex: 0.85;
        padding: var(--padding-input);
        background: var(--col-main);
        color: white;
        border: none;
        @media (max-width: 768px) {
          width: 100%;
        }
      }

      textarea {
        min-height: 15rem;
        @media (max-width: 768px) {
          min-height: 13rem;
        }
      }
      select {
        padding: 0.5rem 1rem;
        flex: 0.05;
        font-weight: bold;
        background: var(--col-main);
        color: white;

        option {
          font-weight: bold;
        }
      }
    }
    button {
      width: fit-content;
      margin: 0 auto;
      padding: 0.7rem 1.2rem;
      background: var(--col-accent);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: bold;
      &.loading {
        background: grey;
      }
    }
  }
`;

export const Error = styled(motion.p)`
  color: white;
  font-size: 1.4rem;
  position: absolute;
  top: 10%;
  text-align: center;
  margin: 0 auto;
  background: var(--col-accent);
  padding: 0.5rem 2rem;
  border-radius: var(--border-radius);
`;
