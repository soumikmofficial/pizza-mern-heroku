import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  items: 0,
  cartAlert: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItems: (state) => {
      return { ...state, items: state.items + 1 };
    },
    addItemToCart: (state, { payload }) => {
      const newItem = payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id && item.varient === newItem.varient
      );

      if (existingItem) {
        if (existingItem.quantity >= 10) {
          alert(`cannot order more than 10 pizzas`);
          return;
        }
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.price =
          existingItem.quantity * existingItem.prices[0][existingItem.varient];
      } else {
        state.cartItems.push(newItem);
      }
    },
  },
});

export const { increaseItems } = cartSlice.actions;

export default cartSlice.reducer;
