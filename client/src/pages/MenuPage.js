import React from "react";
import styled from "styled-components";
import Filter from "../components/Filter";
import Menu from "../components/Menu";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
  },
};

const MenuPage = () => {
  return (
    <Container animate="visible" exit="hidden" variants={containerVariants}>
      <Filter></Filter>
      <Menu />
    </Container>
  );
};

export default MenuPage;
const Container = styled(motion.div)`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-nav-1);

  @media (min-width: 768px) {
    padding: var(--padding-nav-2);
  }
`;
