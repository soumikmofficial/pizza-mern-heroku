import React from "react";
import styled from "styled-components";
import SingleInventoryItem from "./SingleInventoryItem";

const Inventory = ({ pizzas }) => {
  return (
    <Container>
      {pizzas.map((pizza) => {
        return <SingleInventoryItem pizza={pizza} key={pizza._id} />;
      })}
    </Container>
  );
};

export default Inventory;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: clamp(1rem, 50rem, 60rem);
`;
