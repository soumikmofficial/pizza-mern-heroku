import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CartAlert = () => {
  const { cartAlert } = useSelector((state) => state.cart);
  return (
    <Container className={cartAlert ? "active" : ""}>cart changed</Container>
  );
};

export default CartAlert;

const Container = styled.aside`
  padding: 1rem 2rem;
  background: var(--col-pizza-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--col-accent);
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.3rem;
  border-radius: var(--border-radius);
  position: fixed;
  bottom: 5%;
  right: 3%;
  transform: scale(0);
  transition: var(--transition-25);

  &.active {
    transform: scale(1);
  }
`;
