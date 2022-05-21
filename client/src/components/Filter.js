import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setFilteredPizzas } from "../features/pizzas/pizzaSlice";
import { CloseIcon } from "./About";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    y: "-30vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
    },
  },
};

function Filter() {
  const { pizzas } = useSelector((state) => state.pizzas);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    if (pizzas.length >= 1) {
      dispatch(setFilteredPizzas({ input, category }));
    }
  }, [category, input, pizzas, dispatch]);

  return (
    <Container animate="visible" initial="hidden" variants={containerVariants}>
      <SearchBox>
        <input
          type="text"
          placeholder="search pizzas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <CloseIcon onClick={() => setInput("")} />
      </SearchBox>

      <Category>
        <button
          name="all"
          onClick={(e) => setCategory(e.target.name)}
          className={category === "all" ? "active" : ""}
        >
          all
        </button>
        <button
          name="veg"
          onClick={(e) => setCategory(e.target.name)}
          className={category === "veg" ? "active" : ""}
        >
          veg
        </button>
        <button
          name="nonveg"
          onClick={(e) => setCategory(e.target.name)}
          className={category === "nonveg" ? "active" : ""}
        >
          nonveg
        </button>
      </Category>
    </Container>
  );
}

export default Filter;

const Container = styled(motion.section)`
  display: flex;
  /* grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr)); */
  padding: 2rem;
  margin: 1.8rem auto;
  gap: 4rem;
  width: 80%;

  box-shadow: var(--shadow-filter);
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 2rem 1rem;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 0.6;

  input {
    border: 0.4px solid grey;
    background: var(--col-main);
    color: white;
    padding: var(--padding-input);
    width: 100%;
  }
`;
const Category = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  @media (min-width: 980px) {
    justify-content: flex-start;
  }
  button {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: var(--border-radius);
    padding: var(--padding-input);
    background: var(--col-main);

    &.active {
      background: var(--col-accent);
    }
  }
`;
