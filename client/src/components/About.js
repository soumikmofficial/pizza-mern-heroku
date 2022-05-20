import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../features/pizzas/pizzaSlice";
import { motion, AnimatePresence } from "framer-motion";
import AboutSection from "./AboutSection";
import ReviewSection from "./ReviewSection";
import { fetchReviews } from "../features/review/reviewSlice";
import { Link } from "react-router-dom";

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function About() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.pizzas.modal);
  const [panel, setPanel] = useState("about");
  const { userReview } = useSelector((state) => state.reviews);

  const handleClose = () => {
    setPanel("about");
    dispatch(hideModal());
  };

  useEffect(() => {
    if (modal) {
      dispatch(fetchReviews(`/api/v1/reviews/get-all/${modal.id}`));
    }
  }, [modal, dispatch]);

  return (
    <AnimatePresence exitBeforeEnter>
      {modal && (
        <Container
          animate="visible"
          initial="hidden"
          exit="exit"
          variants={variants}
          key={modal.id}
          onClick={handleClose}
        >
          <Details onClick={(e) => e.stopPropagation()}>
            <ReviewBtns>
              <div className="btns-container">
                <div className="btns">
                  <button
                    className={panel === "about" ? "active" : ""}
                    onClick={() => setPanel("about")}
                  >
                    about
                  </button>
                  <div
                    className={
                      panel === "about" ? "active underline" : "underline"
                    }
                  />
                </div>
                <div className="btns">
                  <button
                    className={panel === "reviews" ? "active" : ""}
                    onClick={() => setPanel("reviews")}
                  >
                    reviews & ratings
                  </button>
                  <div
                    className={
                      panel === "reviews" ? "active underline" : "underline"
                    }
                  />
                </div>
              </div>
              <OtherBtns>
                {userReview ? (
                  <Link to={`/reviews/update/${userReview._id}`}>
                    update review
                  </Link>
                ) : (
                  <Link to={`/reviews/add/${modal.id}`}>add review</Link>
                )}

                <CloseIcon onClick={handleClose} />
              </OtherBtns>
            </ReviewBtns>
            <DisplayContainer>
              <ImgContainer>
                <div className="title"></div>
                <img src={modal.image} alt="" />
              </ImgContainer>

              <ReviewContainer>
                {panel === "about" && (
                  <AboutSection modal={modal} key={modal.id} />
                )}
                {panel === "reviews" && <ReviewSection productId={modal.id} />}
              </ReviewContainer>
            </DisplayContainer>
          </Details>
        </Container>
      )}
    </AnimatePresence>
  );
}

export default About;

const Container = styled(motion.div)`
  position: fixed;
  min-height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: var(--col-modal-grey);
  color: black;
`;

const Details = styled(motion.article)`
  border-radius: var(--border-radius);
  padding: 2rem 3rem;
  width: 60rem;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-pizza);
  background: var(--col-pizza-grey);
  color: white;
  overflow: scroll;
  height: 35rem;
  @media (max-width: 768px) {
    min-height: 100vh;
    display: block;
  }
`;

const ReviewBtns = styled.div`
  display: flex;
  flex: 0.15;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 3rem 0;
    margin-bottom: 2rem;
  }

  .btns-container {
    gap: 1rem;
    display: flex;
    .btns {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      border-radius: 5rem;
      .underline {
        transform: scale(0);
        height: 0.3rem;
        transition: all 0.3s ease;
        background: var(--col-accent);
        &.active {
          transform: scale(1);
        }
      }
    }

    button {
      color: white;
      padding: 0.3rem 0.5rem;
      background: none;
      border: none;
      text-transform: capitalize;
      cursor: pointer;
      position: relative;
      color: grey;
      transition: all 0.25s ease;
      &.active {
        transform: scale(1.02);
        color: white;
      }
    }
  }
`;

const DisplayContainer = styled.div`
  flex: 0.85;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ImgContainer = styled.div`
  flex: 0.4;
  img {
    width: 80%;
    aspect-ration: 1 / 1;
    border-radius: 100%;
    @media (max-width: 768px) {
      width: 30%;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ReviewContainer = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;

export const CloseIcon = styled(AiFillCloseCircle)`
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--col-accent);
`;

const OtherBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  a {
    color: var(--col-accent);
    font-size: 1.2rem;
    text-decoration: underline;
  }
`;
