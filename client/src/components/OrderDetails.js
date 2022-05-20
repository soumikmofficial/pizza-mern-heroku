import React from "react";
import styled from "styled-components";

const OrderDetails = ({ showDetails, orderItems }) => {
  return (
    <Container className={showDetails ? "active" : ""}>
      {orderItems.map((item, index) => {
        return (
          <ItemDetails key={index}>
            <p className="name">{item.name}</p>
            <p className="varient">{item.varient}</p>
            <p className="quantity">{item.quantity}</p>
            <p className="price">{item.price}</p>
          </ItemDetails>
        );
      })}
    </Container>
  );
};

export default OrderDetails;

const Container = styled.div`
  background: var(--col-accent);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  max-height: 0;
  overflow: hidden;
  transition: var(--transition-25);
  width: 100%;

  &.active {
    max-height: 20rem;
    padding: 1rem 2rem;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: bold;
    font-size: 1.4rem;
    flex: 0.15;
    text-align: center;
    text-transform: capitalize;
  }
  .name {
    flex: 0.4;
  }
  .varient {
    flex: 0.3;
  }
`;
