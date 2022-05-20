import React, { useState } from "react";
import styled from "styled-components";
import { showModal } from "../features/pizzas/pizzaSlice";
import { motion } from "framer-motion";
import { addItemToCart, setTotalPrice } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function Pizza({ pizza }) {
  const [varient, setVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = (pizza, varient, quantity) => {
    let item = {
      id: pizza._id,
      name: pizza.name,
      image: pizza.image,
      varient,
      quantity,
      price: pizza.prices[0][varient] * quantity,
      prices: pizza.prices,
      inventory: pizza.inventory,
    };

    dispatch(addItemToCart(item));
    dispatch(setTotalPrice());
  };
  console.log(pizza.image);

  return (
    <Container layout>
      <h1 className="name">{pizza.name}</h1>
      <img
        src={pizza.image}
        alt=""
        onClick={() =>
          dispatch(
            showModal({
              id: pizza._id,
              category: pizza.category,
              name: pizza.name,
              image: pizza.image,
              description: pizza.description,
              numOfReviews: pizza.numOfReviews,
              averageRating: pizza.averageRating,
            })
          )
        }
      />
      <Choices>
        <div className="varients">
          <p htmlFor="varient">varients:</p>
          <select
            name=""
            id="varient"
            onChange={(e) => setVarient(e.target.value)}
          >
            {pizza.varients.map((v, i) => (
              <option value={v} key={i}>
                {v}
              </option>
            ))}
          </select>
        </div>{" "}
        <div className="quantity">
          <p htmlFor="quantity">quantity:</p>
          <select
            name=""
            id="quantity"
            onChange={(e) => setQuantity(Number(e.target.value) + 1)}
          >
            {Array.from({
              length: pizza.inventory <= 10 ? pizza.inventory : 10,
            }).map((_, i) => (
              <option value={i++} key={i}>
                {i++}
              </option>
            ))}
          </select>
        </div>
      </Choices>
      <Order>
        <p>
          $<span>{pizza.prices[0][varient] * quantity}</span>
        </p>
        <AddToCartBtn
          onClick={() => handleAddToCart(pizza, varient, quantity)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, background: "grey" }}
          disabled={pizza.inventory < 1}
          className={pizza.inventory < 1 ? "disabled" : ""}
        >
          {pizza.inventory >= 1 ? "add to cart" : "sold out"}
        </AddToCartBtn>
      </Order>
    </Container>
  );
}

export default Pizza;

const Container = styled(motion.article)`
  align-items: center;
  background: var(--col-pizza-grey);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-pizza);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  width: clamp(20rem, 25rem, 30rem);
  img {
    width: 60%;
    cursor: pointer;
    border-radius: 100%;
    aspect-ratio: 1/1;
  }
`;

const Choices = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  & > * {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    gap: 0.5rem;

    p {
      text-transform: capitalize;
      font-size: 1.2rem;
      font-weight: bold;
    }

    select {
      width: 100%;
      text-align: center;
      padding: 0.3rem 0;
      background: var(--col-main);
      color: white;
    }
  }
`;

const Order = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  & > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
  }
  p {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const AddToCartBtn = styled(motion.button)`
  background: var(--col-accent);
  border: none;
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  cursor: pointer;
  border-radius: var(--border-radius);

  &.disabled {
    background: grey;
  }
`;
