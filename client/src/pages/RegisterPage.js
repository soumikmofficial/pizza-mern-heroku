import React, { useState, useEffect } from "react";
import { registerUser } from "../api/register";
import { validateEmail } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Container, Else } from "./LoginPage";
import styled from "styled-components";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    x: "-100vw",
  },
  exit: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.3,
    },
  },
};
const buttonVariants = {
  hidden: {
    scale: 0.9,
  },
  loading: {
    scale: [1, 0.9],
    background: "grey",
    transition: {
      type: "tween",
      duration: 2,
      yoyo: Infinity,
    },
  },
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  // todo: handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password1 !== input.password2) {
      alert(`passwords do not match`);
      return;
    }
    if (!validateEmail(input.email)) return;
    const user = {
      name: input.name,
      email: input.email,
      password: input.password1,
    };
    setLoading(true);
    try {
      const { message } = await registerUser(user);
      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
    setInput({
      name: "",
      email: "",
      password1: "",
      password2: "",
    });
  };

  // todo: if logged in redirect to menu page
  useEffect(() => {
    if (user) {
      navigate("/menu");
    }
  }, [user, navigate]);

  return (
    <Container
      as={motion.div}
      exit="exit"
      animate="visible"
      initial="hidden"
      variants={containerVariants}
    >
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {message && <Message>{message}</Message>}
        <input
          required
          type="text"
          placeholder="name"
          name="name"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="email"
          name="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password1"
          value={input.password1}
          onChange={(e) => setInput({ ...input, password1: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="confirm password"
          name="password2"
          value={input.password2}
          onChange={(e) => setInput({ ...input, password2: e.target.value })}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, background: "grey" }}
          variants={buttonVariants}
          animate={loading ? "loading" : "submit"}
          disabled={loading}
        >
          {loading ? "loading..." : "submit"}
        </motion.button>
        <Else>
          <small>already have an account?</small>{" "}
          <Link to="/login">Log in</Link>
        </Else>
      </Form>
    </Container>
  );
};

export default RegisterPage;

const Message = styled.p`
  text-align: center;
  color: var(--col-accent);
  margin-bottom: 2rem;
  font-size: 1.3rem;
`;
