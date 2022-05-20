import React, { useState } from "react";
import styled from "styled-components";
import Inventory from "./Inventory";
import AddPizza from "./AddPizza";
import { usePizzasHook } from "../hooks/usePizzasHook";

const InventorySection = () => {
  // todo: the query to fetch all pizzas current data;
  const { isLoading, data } = usePizzasHook(10000);

  const [panel, setPanel] = useState("edit");

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (data) {
    const { pizzas } = data;
    return (
      <Container>
        <Pages>
          <button
            className={panel === "edit" ? "edit active" : "edit"}
            onClick={() => setPanel("edit")}
          >
            edit inventory
          </button>
          <button
            className={panel === "add" ? "add active" : "add"}
            onClick={() => setPanel("add")}
          >
            add item
          </button>
        </Pages>
        <Body>
          {panel === "edit" ? <Inventory pizzas={pizzas} /> : <AddPizza />}
        </Body>
      </Container>
    );
  }
};

export default InventorySection;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Pages = styled.div`
  display: flex;
  gap: 2rem;

  button {
    padding: 0.8rem 1.4rem;
    border: none;
    border-radius: 8rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition-25);
    &.active {
      background: var(--col-accent);
      color: white;
    }
  }
`;

const Body = styled.div``;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 3rem;
`;
