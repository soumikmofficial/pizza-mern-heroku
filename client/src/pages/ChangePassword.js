import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "./LoginPage";
import { Container } from "./LoginPage";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    scale: 2,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
    },
  },
};

const ChangePassword = () => {
  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = useSelector((state) => state.user.user);

  // todo: handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password1, password2 } = inputs;
    if (password1 !== password2) {
      alert(`the passwords do not match`);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/change-password", {
        email,
        password: password1,
      });
      if (res.data.status === "success") {
        setMessage(res.data.message);
        setInputs({ password1: "", password2: "" });
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  return (
    <Container
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit}>
        {message && (
          <p style={{ color: "blue", textAlign: "center", fontSize: "1.4rem" }}>
            {message}
          </p>
        )}
        <div className="form-group">
          <input
            required
            type="password"
            name="password1"
            placeholder="password"
            onChange={(e) =>
              setInputs({ ...inputs, password1: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            required
            type="password"
            name="password2"
            placeholder="confirm password"
            onChange={(e) =>
              setInputs({ ...inputs, password2: e.target.value })
            }
          />
        </div>
        <button type="submit">{loading ? "loading..." : "submit"}</button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
