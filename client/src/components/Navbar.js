import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { setCartCount } from "../features/cart/cartSlice";
import Dropdown from "./DropdownNav";
import { BsFillCartDashFill } from "react-icons/bs";

function Navbar() {
  const { cartItems, items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // todo: update cart value
  useEffect(() => {
    dispatch(setCartCount());
  }, [cartItems, dispatch]);

  return (
    <Nav className="navbar">
      <Logo to="/menu">
        P<span className="i-span">i</span>zzy
      </Logo>
      <RightBtns>
        {user && (
          <>
            {user.role === "admin" && (
              <Link to="/admin/dashboard" className="dashboard">
                dashboard
              </Link>
            )}
            <Link to="/cart" className="cart">
              <BsFillCartDashFill className="cart-icon" /> <span>{items}</span>
            </Link>
            <Dropdown>{user?.name}</Dropdown>
          </>
        )}

        {!user && (
          <AuthBtns>
            <LoginBtn to="/login">login</LoginBtn>
            <RegisterBtn to="/register">register</RegisterBtn>
          </AuthBtns>
        )}
      </RightBtns>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  align-items: center;
  background: var(--col-main);
  box-shadow: var(--shadow-navbar);
  display: flex;
  font-size: 2rem;
  height: 10vh;
  justify-content: space-between;
  padding: 0 3rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 6rem;
  }
`;

const Logo = styled(Link)`
  position: relative;
  color: var(--col-accent);
  cursor: pointer;
  font-size: 3.5rem;
  font-weight: bold;
  font-family: var(--font-cursive);
  letter-spacing: 0.5rem;
  span {
    color: white;
  }
`;

const RightBtns = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 0.7rem;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 500;
    text-transform: capitalize;
  }
  a {
    text-transform: capitalize;
    font-size: 1.6rem;
  }

  .dashboard {
    margin-right: 2rem;
    text-decoration: underline;
  }

  .cart {
    align-items: center;
    display: block;
    display: flex;
    position: relative;

    .cart-icon {
      font-size: 2rem;
    }
    span {
      align-items: center;
      background: var(--col-accent);
      border-radius: 50%;
      color: white;
      display: flex;
      font-size: 1rem;
      font-weight: bold;
      height: 1.6rem;
      justify-content: center;
      position: absolute;
      right: -20%;
      top: -50%;
      top: 1;
      width: 1.6rem;
    }
  }
`;

const AuthBtns = styled.div`
  display: flex;
  gap: 2rem;
`;

const LoginBtn = styled(NavLink)`
  transition: all 0.25s ease;
  color: grey;
  &.active {
    color: white;
  }
  &:hover {
    color: var(--col-blue -btn);
    transform: scale(1.05);
  }
`;
const RegisterBtn = styled(LoginBtn)``;
