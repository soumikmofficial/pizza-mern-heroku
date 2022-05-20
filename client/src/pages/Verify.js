import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  console.log(token, email);

  const verifyUser = async (credentials) => {
    try {
      const res = await axios.post("/api/v1/auth/verify-email", credentials);
      setIsVerified(true);
      setMessage(res.data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
      setIsVerified(false);
    }
  };

  useEffect(() => {
    verifyUser({ token, email });
  }, [email, token]);

  return (
    <Container>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <Message>{message}</Message>
          {isVerified && <HomeBtn to="/">Order Now</HomeBtn>}
        </>
      )}
    </Container>
  );
};

export default Verify;

export const Container = styled.main`
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;
const Message = styled.p`
  font-size: 2.2rem;
  text-transform: capitalize;
`;

const HomeBtn = styled(Link)`
  padding: var(--padding-input);
  background: var(--col-accent);
  color: white;
  border-radius: var(--border-radius);
  font-size: 1.3rem;
`;
