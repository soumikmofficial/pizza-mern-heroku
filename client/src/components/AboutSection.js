import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    x: "-100%",
  },
  visible: {
    x: 0,
  },
};

const AboutSection = ({ modal, panel }) => {
  const { numOfReviews, averageRating } = modal;
  return (
    <Container
      className="about"
      animate="visible"
      initial="hidden"
      variants={containerVariants}
      key={modal.id}
    >
      <div className="name">
        <p>{modal.name}</p>
        <img
          src={`/images/${
            modal.category === "veg" ? "green" : "red"
          }-circle.svg`}
          alt=""
        />
      </div>
      <div className="rating">
        <p className="label">rating:</p>
        <Stars>
          {Array.from({ length: 5 }, (_, index) => {
            const number = index + 0.5;
            return (
              <p key={index}>
                {averageRating >= index + 1 ? (
                  <FaStar />
                ) : averageRating >= number ? (
                  <FaStarHalf />
                ) : (
                  <FaRegStar />
                )}
              </p>
            );
          })}
          {numOfReviews >= 1 && (
            <p className="num">
              {numOfReviews} {numOfReviews > 1 ? "reviews" : "review"}
            </p>
          )}
        </Stars>
      </div>

      <div className="category">
        <p className="label">category:</p>
        <p className="info">{modal.category}</p>
      </div>

      <div className="desc">
        <p className="label">about:</p>
        <p className="info">{modal.description}</p>
      </div>
    </Container>
  );
};

export default AboutSection;

const Container = styled(motion.div)`
  padding-left: 0.5rem;
  display: flex;
  gap: 1.3rem;
  flex-direction: column;
  justify-content: stretch;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .label {
      font-weight: bold;
      text-transform: capitalize;
      font-size: 1.3rem;
    }

    .info {
      font-style: italic;
      font-size: 1.4rem;
    }
    @media (max-width: 768px) {
      text-align: center;
    }
  }

  .name {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    p {
      font-weight: bold;
      font-size: 1.3rem;
    }
    img {
      width: 1.2rem;
    }
    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  .category {
    flex-direction: row;
    gap: 1.3rem;
    text-transform: capitalize;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }
`;

const Stars = styled.div`
  font-size: 1.3rem;
  color: var(--col-accent);
  display: flex;
  align-items: center;
  .num {
    margin-left: 0.8rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
