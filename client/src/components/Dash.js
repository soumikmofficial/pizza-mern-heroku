import React from "react";
import styled from "styled-components";

const Dash = ({ users, reviews, sales, inventory }) => {
  return (
    <Container>
      <div className="stat">
        <p className="title">users:</p>
        <p className="info">{users}</p>
      </div>
      <div className="stat">
        <p className="title">sales:</p>
        <p className="info">{sales}</p>
      </div>
      <div className="stat">
        <p className="title">reviews:</p>
        <p className="info">{reviews}</p>
      </div>
      <div className="stat">
        <p className="title">inventory:</p>
        <p className="info">{inventory}</p>
      </div>
    </Container>
  );
};

export default Dash;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  .stat {
    border-radius: var(--border-radius);
    background: var(--col-pizza-grey);
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 2.5rem;

    .title {
      font-size: 2rem;
      text-transform: capitalize;
    }

    .info {
      font-size: 2.5rem;
      color: var(--col-accent);
    }
  }
`;
