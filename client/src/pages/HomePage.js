import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
  },
};
const iSpanVariants = {
  visible: {
    rotate: 45,
    originY: 0.55,
    originX: 0,
    transition: {
      delay: 1,
      type: "spring",
    },
  },
};

const zSpanVariants = {
  visible: {
    x: 10,
    transition: {
      delay: 1,
      type: "spring",
    },
  },
};

function HomePage() {
  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={containerVariants}
    >
      <Wrapper>
        <Brand>
          P
          <motion.span
            className="i-span"
            animate="visible"
            variants={iSpanVariants}
          >
            i
          </motion.span>
          <motion.span
            className="z-span"
            animate="visible"
            variants={zSpanVariants}
          >
            zzy
          </motion.span>
        </Brand>
        <About>Pizza made easy and cheesy</About>
        <ExploreBtn to="/menu">Explore</ExploreBtn>
      </Wrapper>
    </Container>
  );
}

export default HomePage;

const Container = styled(motion.main)`
  display: flex;
  justify-content: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    94deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(31, 31, 41, 1) 49%,
    rgba(41, 43, 54, 1) 68%
  );
  height: 100vh;
  align-items: center;
`;

const Wrapper = styled.div`
  text-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Brand = styled.h1`
  letter-spacing: 0.5rem;
  font-family: var(--font-cursive);
  font-size: 9rem;
  color: var(--col-accent);
  .i-span {
    color: white;
    display: inline-block;
  }
  .z-span {
    display: inline-block;
  }
`;

const About = styled.p`
  font-family: var(--font-cursive);
  font-size: 2.6rem;
  margin: 0.3rem 0 6rem;
  text-transform: capitalize;
`;

const ExploreBtn = styled(Link)`
  background: var(--col-accent);
  font-size: 1.5rem;
  padding: 0.8rem 1.6rem;
  color: white;
  border-radius: var(--border-radius);
  display: block;
  width: fit-content;
  margin: 0 auto;
  @media (min-width: 768px) {
    margin: 0;
  }
`;
