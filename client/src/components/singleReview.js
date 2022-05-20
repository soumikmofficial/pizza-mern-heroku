import React, { useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { removeReview, fetchReviews } from "../features/review/reviewSlice";
import { hideModal } from "../features/pizzas/pizzaSlice";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const containerVariants = {
  exit: {
    scale: 0,
  },
};
const SingleReview = ({ review }) => {
  const { userId } = useSelector((state) => state.user.user);
  const [isPrompt, setIsPrompt] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    dispatch(hideModal());
    navigate(`/reviews/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/reviews/${review._id}`);
      if (data.status === "success") {
        dispatch(removeReview(review._id));
        dispatch(fetchReviews());
      }
    } catch (error) {
      console.log(error.response.data);
    }
    setIsPrompt(false);
  };

  return (
    <Container key={review._id} variants={containerVariants} exit="exit">
      <div className="header">
        <p className="title">{review.title}</p>
        {review.user._id === userId && (
          <div className="modify">
            <BsThreeDotsVertical
              className="dots"
              onClick={() => setIsPrompt(!isPrompt)}
            />
            <div className={isPrompt ? "modify-btns active" : "modify-btns"}>
              <button onClick={() => handleUpdate(review._id)}>update</button>
              <button onClick={() => handleDelete(review._id)}>delete</button>
            </div>
          </div>
        )}
      </div>
      <div className="sub-title">
        <div className="stars">
          {Array.from({ length: review.rating }, (_, i) => (
            <AiFillStar key={i} />
          ))}
        </div>
        <p className="user">{review.user.name}</p>
      </div>
      <div className="comment">{review.comment}</div>
    </Container>
  );
};

export default SingleReview;

const Container = styled(motion.div)`
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  background: var(--col-main);
  padding: 0.8rem 1.2rem;
  .header {
    font-weight: bold;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
    }

    .modify {
      display: flex;
      position: relative;
      align-self: flex-end;
      .dots {
        color: var(--col-accent);
        cursor: pointer;
      }

      .modify-btns {
        position: absolute;
        background: var(--col-pizza-grey);
        top: 80%;
        right: 100%;
        border-radius: 0.5rem 0 0.5rem 0.5rem;
        display: flex;
        align-items: center;
        /* flex-direction: column; */
        gap: 1rem;
        text-transform: capitalize;
        transition: var(--transition-25);
        width: 0;
        overflow: hidden;
        &.active {
          width: fit-content;
          padding: 0.8rem 1.2rem;
        }
        button {
          background: none;
          border: none;
          color: white;
          text-transform: capitalize;
          cursor: pointer;
          transition: var(--transition-25);
          font-weight: bold;

          &:hover {
            color: var(--col-accent);
          }
        }
      }
    }
  }
  .sub-title {
    display: flex;
    gap: 1rem;
    align-items: center;
    .stars {
      color: var(--col-accent);
      display: flex;
      align-items: center;
    }
    .user {
      font-size: 1.2rem;
      font-style: italic;
      color: grey;
    }
  }
  .comment {
    margin-top: 0.9rem;
    font-size: 1.3rem;
  }
`;
