import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  HomePage,
  CartPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  ForgotPassword,
  MenuPage,
  Verify,
  ChangePassword,
  OrdersPage,
  UpdateReviewPage,
  AddReviewPage,
  AdminDashboard,
} from "../pages";
import {
  PaymentStatus,
  About,
  NavLayer,
  ProtectedRoutes,
  CartAlert,
  AdminRoutes,
} from ".";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <About />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route element={<NavLayer />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="auth/verify-email" element={<Verify />} />
          {/* todo: protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/payment/status/:paymentId"
              element={<PaymentStatus />}
            />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/reviews/add/:id" element={<AddReviewPage />} />
            <Route path="/reviews/update/:id" element={<UpdateReviewPage />} />
            {/* Admin routes */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
