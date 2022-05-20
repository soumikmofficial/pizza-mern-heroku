import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Pizza from "./Pizza";
import { setPizzas } from "../features/pizzas/pizzaSlice";
import { motion } from "framer-motion";
import { usePizzasHook } from "../hooks/usePizzasHook";

const containerVariants = {
  hidden: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.1,
      mass: 0.7,
    },
  },
};

function Menu() {
  const { isLoading, data, isError } = usePizzasHook();

  const dispatch = useDispatch();
  const { filteredPizzas } = useSelector((state) => state.pizzas);

  useEffect(() => {
    if (data) {
      dispatch(setPizzas(data.pizzas));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <Container>
        <Loading>Loading</Loading>
      </Container>
    );
  }
  if (isError) {
    return (
      <Container>
        <Message>something went wrong... please try again</Message>
      </Container>
    );
  }

  return (
    <Container animate="visible" initial="hidden" variants={containerVariants}>
      {filteredPizzas.length > 0 ? (
        filteredPizzas.map((pizza) => <Pizza key={pizza._id} pizza={pizza} />)
      ) : (
        <Message>Couldn't find anything for you now</Message>
      )}
    </Container>
  );
}

export default Menu;

const Container = styled(motion.main)`
  background: var(--col-main);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  align-items: start;
  gap: 1rem;
  width: 100%;
  padding-bottom: 5rem;
  min-height: 80vh;
  position: relative;
`;

const Loading = styled.div`
  width: 85%;
  text-align: center;
  font-size: 3rem;
  padding: 2rem 0;
`;
const Message = styled.div`
  width: 85%;
  text-align: center;
  font-size: 2rem;
  padding: 2rem 0;
  position: absolute;
  top: 50%;
`;
