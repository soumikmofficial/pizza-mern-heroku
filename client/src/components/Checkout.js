import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getOrder } from "../api/payment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const navigate = useNavigate();
  const { total, cartItems } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await getOrder({ amount: total * 100 });

    if (!result) {
      alert("no order could be created");
      return;
    }

    const { amount, id: order_id, currency } = result.order;

    let options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: amount.toString(),
      currency: currency,
      name: "Pizzy Mern",
      description: "Test Transaction",
      image:
        "https://s.tmimgcdn.com/scr/800x500/181700/delicious-pizza-logo-for-pizza-food-restaurant-logo-template_181724-original.jpg",
      order_id: order_id,
      handler: async (response) => {
        try {
          await axios.post(`/api/v1/payment/handler`, {
            total: total,
            orderItems: cartItems,
            user: user.userId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
        } catch (error) {
          alert(`Order placement was unsuccessful. Please try again.`);
        }

        navigate(`/payment/status/${response.razorpay_payment_id}`);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "1234567890",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#e23a1d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Container>
      <p>
        Total: <span>{total}</span>/-
      </p>
      <OrderBtn
        onClick={displayRazorpay}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95, background: "grey" }}
      >
        Order Now
      </OrderBtn>
      <Link to="/menu">go back to shopping</Link>
    </Container>
  );
};

export default Checkout;

const Container = styled.div`
  align-items: center;
  background: var(--col-pizza-grey);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-checkout);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: auto;
  padding: 2.5rem 2rem;
  width: clamp(20rem, 22rem, 25rem);
  background: none;

  @media (max-width: 768px) {
    width: 100%;
  }
  p {
    font-size: 1.5rem;
  }
  a {
    color: var(--col-blue-btn);
    font-size: 1.2rem;
    text-decoration: underline;
  }
`;

const OrderBtn = styled(motion.button)`
  background: var(--col-accent);
  border-radius: var(--border-radius);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.7rem 1rem;
  width: 100%;
  @media (max-width: 768px) {
    width: fit-content;
  }
`;
