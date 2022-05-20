import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SingleInventoryItem = ({ pizza }) => {
  const [input, setInput] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const { data } = await axios.patch(
        `/api/v1/pizzas/update-admin-inventory`,
        { quantity: input, id: pizza._id }
      );
      setMessage(data.status === "success" ? "updated" : `failed`);
      setUpdating(false);
    } catch (error) {
      setMessage("failed");
      setUpdating(false);
    }
  };
  useEffect(() => {
    setInput(pizza.inventory);
  }, [pizza.inventory]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  return (
    <Container>
      <h2>{pizza.name}</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="stock">stock</label>
          <Input
            required
            type="text"
            id="stock"
            value={input}
            input={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={
            message === "updated"
              ? "updated"
              : message === "failed"
              ? "failed"
              : ""
          }
        >
          {updating ? "updating" : message ? message : "update"}
        </button>
      </Form>
    </Container>
  );
};

export default SingleInventoryItem;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  button {
    align-self: center;
    padding: 1rem 0.5rem;
    cursor: pointer;
    border-radius: var(--border-radius);
    background: var(--col-accent);
    color: white;
    border: none;
    &.updated {
      background: green;
      color: white;
    }
    &.failed {
      background: tomato;
      color: white;
    }
  }
  .form-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    label {
      text-transform: capitalize;
    }
  }
`;

const Input = styled.input`
  border-radius: var(--border-radius);
  padding: var(--padding-input);
  width: clamp(1rem, 8rem, 50rem);
  text-align: center;
  font-weight: bold;
  color: ${(props) =>
    props.input <= 5 ? "red" : props.input > 20 ? "green" : "black"};
`;
