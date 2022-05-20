import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchOrders } from "../api/orders";
import SingleOrder from "../components/SingleOrder";

const orderContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      mass: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const OrdersPage = () => {
  const [allOrders, setAllOrders] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  // todo: fetch orders
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { orders } = await fetchOrders("/api/v1/order/get-my-orders");
        setAllOrders(orders);
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getOrders();
  }, []);

  // todo: filter by category
  useEffect(() => {
    let filtered;
    if (category === "processing")
      filtered = allOrders.filter((order) => order.isDelivered === false);
    if (category === "delivered")
      filtered = allOrders.filter((order) => order.isDelivered);
    if (category === "all") filtered = allOrders;

    setOrders(filtered);
  }, [category, allOrders]);

  if (loading) {
    return <Loading>loading...</Loading>;
  }
  if (allOrders.length < 1) {
    return (
      <Container>
        <NoOrder>
          <Emote src="/images/Sad-Little-Cloud.svg" className="image" />
          <p>You have not made any purchase yet</p>
        </NoOrder>
      </Container>
    );
  }
  return (
    <Container>
      <OrderContainer
        animate="visible"
        initial="hidden"
        variants={orderContainerVariants}
      >
        {/* buttons to switch between order types  */}
        <Btns>
          <button
            className={category === "processing" ? "active" : ""}
            name="processing"
            onClick={(e) => setCategory(e.target.name)}
          >
            processing
          </button>
          <button
            className={category === "delivered" ? "active" : ""}
            name="delivered"
            onClick={(e) => setCategory(e.target.name)}
          >
            delivered
          </button>
          <button
            className={category === "all" ? "active" : ""}
            name="all"
            onClick={(e) => setCategory(e.target.name)}
          >
            all
          </button>
        </Btns>
        {orders.map((order) => {
          return <SingleOrder key={order.orderId} {...order} />;
        })}
      </OrderContainer>
    </Container>
  );
};

export default OrdersPage;

const Container = styled(motion.div)`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
  position: relative;
`;

const OrderContainer = styled(motion.section)`
  width: clamp(40rem, 80%, 65rem);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin: 1rem 0 1.5rem;
  button {
    padding: 0.5rem 1.1rem;
    border-radius: 8rem;
    border: none;
    text-transform: capitalize;
    color: white;
    background: none;
    cursor: pointer;
    transition: var(--transition-25);
    &.active {
      background: var(--col-accent);
    }
  }
`;

const NoOrder = styled.p`
  color: grey;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  font-size: 1.4rem;
`;

const Emote = styled.img`
  width: 40%;
`;

const Loading = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-transform: capitalize;
`;
