import axios from "axios";
import React, { useState } from "react";
import { validateEmail } from "../utils/validation";
import { Form } from "./LoginPage";
import { Container } from "./LoginPage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <Container>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        {message && (
          <p
            className="message"
            style={{
              color: "#f54d6e",
              textAlign: "center",
              fontSize: "1.4rem",
            }}
          >
            {message}
          </p>
        )}
        <div className="form-group">
          <input
            required
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
