import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./features/auth/userSlice";

import { CartAlert, AnimatedRoutes } from "./components";
import { hideAlert, showAlert } from "./features/cart/cartSlice";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(showAlert());
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  }, [items, dispatch]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <AnimatedRoutes />
        </Router>
        <CartAlert />
      </div>
    </QueryClientProvider>
  );
}

export default App;
