import React from "react";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>page not found</p>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  h1 {
    font-size: 5rem;
    color: tomato;
  }
  p {
    font-size: 2rem;
  }
`;
