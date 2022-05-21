import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import Checkout from "../components/Checkout";
import { useSelector, useDispatch } from "react-redux";
import {
  removeOneItem,
  setTotalPrice,
  addOneItem,
  removeAllItem,
  clearFullCart,
} from "../features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const singleItemVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  remove: {
    x: "100vw",
    transition: {
      duration: 0.3,
      opacity: 0,
    },
  },
};

const containerVariants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 2,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const CartPage = () => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // todo: remove one instance of an item
  const removeItem = async (id, varient, index) => {
    const item = { id, varient, index };
    dispatch(removeOneItem(item));
  };
  //  todo: remove item
  const removeAll = async (index, id, quantity) => {
    dispatch(removeAllItem({ index }));
  };
  // todo: add one instance of an item

  const addItem = async (id, varient, inventory) => {
    if (inventory >= 1) {
      const item = { id, varient };
      dispatch(addOneItem(item));
    }
  };

  useEffect(() => {
    dispatch(setTotalPrice());
  }, [cartItems, dispatch]);

  return (
    <Container
      exit="exit"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 onClick={() => dispatch(clearFullCart())}>Your Cart</h2>

      <Wrapper>
        <Items>
          {cartItems.length < 1 && (
            <h2 style={{ margin: "0 auto" }}>You have no items in your cart</h2>
          )}
          <AnimatePresence>
            {cartItems.map((pizza, index) => {
              return (
                <SingleItem
                  key={pizza.id}
                  animate="visible"
                  initial="hidden"
                  variants={singleItemVariants}
                  exit="remove"
                >
                  <Details>
                    <h3>
                      {pizza.name} <span>[{pizza.varient}]</span>
                    </h3>
                    <img src={pizza.image} alt="pizza" />
                    <h4>
                      {pizza.prices[0][pizza.varient]} * {pizza.quantity} =
                      {pizza.price}
                    </h4>
                  </Details>
                  {/* add or remove one item at a time */}
                  <Quantity>
                    <RemoveBtn
                      onClick={() => removeItem(pizza.id, pizza.varient, index)}
                    />
                    <Value>{pizza.quantity}</Value>
                    <AddBtn
                      onClick={() =>
                        addItem(pizza.id, pizza.varient, pizza.inventory)
                      }
                    />
                  </Quantity>
                  <DeleteBtn
                    onClick={() => removeAll(index, pizza.id, pizza.quantity)}
                  />
                </SingleItem>
              );
            })}
          </AnimatePresence>
        </Items>
        {total > 0 && <Checkout />}
      </Wrapper>
    </Container>
  );
};

export default CartPage;

const Container = styled(motion.div)`
  min-height: 90vh;
  margin: 0 auto;
  padding: var(--padding-nav-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: var(--padding-nav-2);
    padding-top: 3rem;
  }

  h2 {
    margin-top: 3rem;
  }
`;
const Wrapper = styled.div`
  width: clamp(40rem, 90%, 65rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0 3rem 0;
  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const SingleItem = styled(motion.div)`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  background: var(--col-pizza-grey);
  color: white;
  border-radius: var(--border-radius);
`;

const Details = styled.div`
  padding: 1rem 1.5rem;
  flex: 0.6;
  gap: 0.8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  h3 {
    font-size: 1.5rem;
    span {
      font-weight: 500;
    }
  }
  img {
    width: 3.5rem;
    aspect-ration: 1 / 1;
    border-radius: 100%;
  }

  h4 {
    font-size: 1.2rem;
  }
`;
const Quantity = styled.div`
  padding: 1rem 1.5rem;
  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.8rem;
`;

const DeleteBtn = styled(AiFillDelete)`
  flex: 0.2;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: var(--col-accent);
`;

const AddBtn = styled(AiOutlinePlus)`
  font-size: 1.7rem;
  color: green;
  cursor: pointer;
`;
const RemoveBtn = styled(AiOutlineMinus)`
  font-size: 1.7rem;
  color: red;
  cursor: pointer;
`;
const Value = styled.h3`
  font-size: 1.7rem;
`;
