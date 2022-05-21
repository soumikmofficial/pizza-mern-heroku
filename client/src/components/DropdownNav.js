import React, { useState } from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../features/auth/userSlice";
import { resetCart } from "../features/cart/cartSlice";

const DropdownNav = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleLogout = () => {
    dispatch(resetCart());
    dispatch(removeUser());
  };

  return (
    <Container>
      <DropdownBtn onClick={() => setIsActive(!isActive)}>
        <p>{user?.name}</p>
        <AiFillCaretDown
          className={isActive ? "down-icon active" : "down-icon"}
        />
      </DropdownBtn>
      <Pointer className={isActive ? "active" : ""} />
      <DropdownContent className={isActive ? "active" : ""}>
        {user.role === "admin" && (
          <Link to="/admin/dashboard" className="dropdown-item">
            dashboard
          </Link>
        )}
        <Link
          to="orders"
          className="dropdown-item"
          onClick={() => setIsActive(false)}
        >
          Orders
        </Link>
        <Link
          to="/change-password"
          className="dropdown-item"
          onClick={() => setIsActive(false)}
        >
          Change Password
        </Link>
        <LogoutBtn className="dropdown-item" onClick={handleLogout}>
          logout
        </LogoutBtn>
      </DropdownContent>
    </Container>
  );
};

export default DropdownNav;

const Container = styled.div`
  position: relative;
`;

const DropdownBtn = styled.div`
  padding: 0 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  p {
    font-size: 1.4rem;
  }
  .down-icon {
    transition: var(--transition-25);
    &.active {
      transform: rotate(180deg);
    }
  }
`;

const DropdownContent = styled.div`
  background: tomato;
  background: var(--col-pizza-grey);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  max-height: 0rem;
  overflow: hidden;
  position: absolute;
  right: 0;
  right: 1rem;
  text-align: right;
  top: 160%;
  transition: var(--transition-25);
  width: clamp(17rem, 19rem, 20rem);
  z-index: 100;

  &.active {
    max-height: 18rem;
    padding: var(--padding-dropdown);
  }

  .dropdown-item {
    color: white;
    display: block;
    text-transform: capitalize;
    &.active {
      color: var(--col-order-btn);
    }
  }
`;

export const Pointer = styled.div`
  position: absolute;
  width: 2rem;
  background: var(--col-grey);
  transform: rotate(45deg);
  right: 2rem;
  top: 140%;
  transition: var(--transition-25);
  height: 0;

  &.active {
    height: 2rem;
  }
`;

const LogoutBtn = styled.button`
  text-align: right;
  font-size: 1.5rem;
  text-transform: capitalize;
  color: white;
`;
