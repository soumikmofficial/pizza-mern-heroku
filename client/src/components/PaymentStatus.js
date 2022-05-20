import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPaymentDetails } from "../api/payment";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { resetCart } from "../features/cart/cartSlice";

const PaymentStatus = () => {
  const dispatch = useDispatch();
  const { paymentId } = useParams();
  const [values, setValues] = useState({
    loading: true,
    payment: null,
    error: "",
  });
  const { loading, error, payment } = values;

  useEffect(() => {
    const fetchDetails = async () => {
      setValues({ ...values, loading: true });
      try {
        const res = await getPaymentDetails(`/api/v1/payment/${paymentId}`);

        if (res.status === "failed") {
          return setValues({
            loading: false,
            error: res.message,
            payment: null,
          });
        }
        if (res.status === "success") {
          setValues({
            ...values,
            loading: false,
            payment: res.payment,
          });
          dispatch(resetCart());
        }
      } catch (error) {
        setValues({ loading: false, error, payment: null });
      }
    };
    fetchDetails();
  }, []);

  if (loading) {
    return (
      <Container>
        <h3>Loading...</h3>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Error>
          <p>{error}</p>
        </Error>
      </Container>
    );
  }

  if (payment) {
    return (
      <Container>
        <Success>
          <Message>Your have successfully placed an order</Message>
          <Details>
            <Info>
              <p className="info-type">order id:</p>
              <h4 className="info-detail">{values.payment?.order_id}</h4>
            </Info>
            <Info>
              <p className="info-type">payment id:</p>
              <h4 className="info-detail">{values.payment?.id}</h4>
            </Info>
            <Info>
              <p className="info-type">mode:</p>
              <h4 className="info-detail">{values.payment?.method}</h4>
            </Info>
            <Info>
              <p className="info-type">total:</p>
              <h4 className="info-detail">{values.payment?.amount / 100}</h4>
            </Info>
          </Details>

          <Link to="/menu">Shop some more</Link>
        </Success>
      </Container>
    );
  }

  return null;
};

export default PaymentStatus;

const Container = styled.main`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
`;

const Error = styled.h3`
  color: tomato;
`;
const Success = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  padding: 4rem 2rem;
  border-radius: var(--border-radius);
  width: clamp(30rem, 40rem, 46rem);
  background: var(--col-pizza-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  .method {
    color: green;
  }
  .amount {
    color: var(--col-blue-btn);
  }
  a {
    background: var(--col-accent);
    width: fit-content;
    padding: 1rem 2rem;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: var(--border-radius);
  }
`;

const Message = styled.h2`
  color: var(--col-green);
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 80%;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  .info-type {
    flex: 1;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  .info-detail {
    flex: 1;
    font-size: 1.5rem;
    text-align: right;
    color: var(--col-blue-btn);
  }
`;
