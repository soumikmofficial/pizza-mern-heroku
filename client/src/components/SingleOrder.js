import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import OrderDetails from "./OrderDetails";

const containerVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      mass: 0.5,
    },
  },
};

const SingleOrder = ({
  orderId,
  total,
  createdAt,
  isDelivered,
  orderItems,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const reg = /(\d{4}-\d{2}-\d{2})T/g;
  const ordereDate = reg.exec(createdAt)[1];

  return (
    <Container layout variants={containerVariants}>
      <OrderNum>
        <p className="order-num">
          order no: <span>{orderId}</span>
        </p>
        <p className="date">{ordereDate}</p>
      </OrderNum>
      <OrderQuantity>
        <p className="quantity">
          quantity: <span>{orderItems.length}</span>
        </p>
        <p className="total">
          total amount: <span>{total}</span>
          <span className="rupee">&#8377;</span>
        </p>
      </OrderQuantity>

      <OrderStatus>
        <OrderStats>
          <button
            className="details-btn"
            onClick={() => setShowDetails(!showDetails)}
          >
            details
          </button>
          <p className={isDelivered ? "status delivered" : "status"}>
            {isDelivered ? "delivered" : "processing"}
          </p>
        </OrderStats>

        <OrderDetails
          className="active"
          showDetails={showDetails}
          orderItems={orderItems}
        />
      </OrderStatus>
    </Container>
  );
};

export default SingleOrder;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--border-radius);

  width: 100%;
  background: var(--col-pizza-grey);
  padding: 2rem;
`;

const OrderNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  span {
    font-weight: bold;
    margin-left: 1rem;
  }
`;

const OrderQuantity = styled(OrderNum)`
  display: flex;
  align-items: center;
  .rupee {
    font-family: serif;
  }
`;

const OrderStatus = styled.div`
  display: flex;
  flex-direction: column;
  transition: var(--transition-25);
`;

const OrderStats = styled(OrderNum)`
  display: flex;
  align-items: center;
  .details-btn {
    padding: 0.5rem 1rem;
    border-radius: 8rem;
    border: none;
    background: var(--col-accent);
    color: white;
    text-transform: capitalize;
    cursor: pointer;
  }

  .status {
    color: var(--col-order-btn);
  }
  .delivered {
    color: var(--col-green);
  }
`;
