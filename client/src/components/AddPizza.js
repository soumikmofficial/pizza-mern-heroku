import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AddPizza = () => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState({ small: "", medium: "", large: "" });
  const [pizza, setPizza] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setPizza({ ...pizza, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = { ...pizza, prices: [price] };
    try {
      const { data } = await axios.post("/api/v1/pizzas", postData);
      setPrice({ small: "", medium: "", large: "" });
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };
  return (
    <Container>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              name="name"
              type="text"
              id="name"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">category</label>
            <input
              name="category"
              type="text"
              id="category"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">image</label>
            <input
              name="image"
              type="text"
              id="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">price</label>
            <input
              type="text"
              id="price"
              name="small"
              placeholder="small"
              value={price.small}
              onChange={(e) =>
                setPrice({ ...price, small: Number(e.target.value) })
              }
            />
            <input
              type="text"
              id="price"
              name="medium"
              placeholder="medium"
              value={price.medium}
              onChange={(e) =>
                setPrice({ ...price, medium: Number(e.target.value) })
              }
            />
            <input
              type="text"
              id="price"
              name="large"
              placeholder="large"
              value={price.large}
              onChange={(e) =>
                setPrice({ ...price, large: Number(e.target.value) })
              }
            />
          </div>
          <button type="submit">add pizza to menu</button>
        </Form>
      )}
    </Container>
  );
};

export default AddPizza;

const Container = styled.div`
  width: clamp(35rem, 40rem, 45rem);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    padding: .8rem 0;
    background: var(--col-accent);
    border: none;
    color: white;
    border-radius: var(--border-radius);
    text-transform: capitalize;
    cursor: pointer;
  }

  .add-var {
    color: white;
    text-transform: capitalize;
    text-decoration: underline;
    cursor: pointer;
  }
  .var-sec {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .var-group {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.3rem;
      
      input {
        width: 4rem;
      }
    }
  }
  .form-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    }

    label {
      flex: 0.2;
      text-transform: capitalize;
      font-size: 1.1rem;
    }
    input,
    textarea {
      flex: 0.8;
      padding: 0.8rem 1rem;
      border-radius: var(--border-radius);
    }

    textarea {
      min-height: 10rem;
      padding: 1.3rem 1rem; 
    }

    #price {
      width: 3rem;
    }
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
