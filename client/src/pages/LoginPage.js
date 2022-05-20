import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  loginPending,
  loginSuccess,
  loginFailed,
} from "../features/auth/loginSlice";
import { sendLoginReq } from "../api/login";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../features/auth/userSlice";
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

const LoginPage = () => {
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  // todo: handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginPending());
    try {
      const isAuth = await sendLoginReq(input);
      if (isAuth.status === "success") {
        dispatch(loginSuccess());
        await dispatch(fetchUser());
        navigate("/menu");
      }
      if (isAuth.status === "failed") {
        dispatch(loginFailed(isAuth));
      }
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };

  // todo: if logged in redirect to menu page
  useEffect(() => {
    if (user) {
      navigate("/menu");
    }
  }, [user, navigate]);

  return (
    <Container
      exit="exit"
      variants={containerVariants}
      animate="visible"
      initial="hidden"
    >
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {error && <Error>{error}</Error>}
        <div className="form-group">
          <input
            required
            type="text"
            placeholder="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={input.password1}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, background: "grey" }}
        >
          {isLoading ? "loading..." : "sbumit"}
        </motion.button>
        <Else>
          <small>Do not have an account?</small>
          <Link to="/register">Register</Link>
        </Else>
      </Form>
    </Container>
  );
};

export default LoginPage;

export const Container = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 90vh;
  justify-content: center;
  width: 100vw;
`;

export const Form = styled.form`
  border-radius: var(--border-radius);
  background: var(--col-pizza-grey);
  box-shadow: var(--shadow-form);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 6rem 4rem;
  width: clamp(28rem, 30rem, 33rem);

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    a {
      color: white;
      margin-left: auto;
    }
  }
  input {
    border-bottom: 1px solid var(--col-trans-grey);
    border-radius: var(--border-radius);
    border: none;
    outline: none;
    background: var(--col-main);
    padding: var(--padding-input);
    color: white;
    &::placeholder {
      text-transform: capitalize;
    }
    &::focus {
    }
  }
  button {
    background: var(--col-accent);
    border-radius: var(--border-radius);
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 2rem;
    padding: 0.5rem 0;
  }
`;

const Error = styled.div`
  background: var(--col-failed);
  color: red;
  font-size: 1.3rem;
  text-align: center;
`;

export const Else = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  small {
    color: grey;
    font-size: 1rem;
  }
  a {
    color: white;
    font-size: 1.2rem;
  }
`;
