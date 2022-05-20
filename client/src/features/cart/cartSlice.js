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
    // Todo: add pizza to cart
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
    // Todo: add one pizza
    addOneItem: (state, { payload }) => {
      const { id, varient } = payload;
      const item = state.cartItems.find(
        (i) => i.id === id && i.varient === varient
      );
      if (item.quantity >= 10) {
        alert(`cannot order more than 10 pizzas`);
        return;
      }
      item.quantity += 1;
      item.price = item.prices[0][varient] * item.quantity;
      state.total += item.prices[0][varient];
    },
    // todo: remove one pizza
    removeOneItem: (state, { payload }) => {
      const { id, varient, index } = payload;
      const item = state.cartItems.find(
        (i) => i.id === id && i.varient === varient
      );
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.price = item.prices[0][varient] * item.quantity;
        state.total -= item.prices[0][varient];
      } else {
        state.cartItems.splice(index, 1);
      }
    },

    //  todo: remove item from cart

    removeAllItem: (state, { payload }) => {
      const { index } = payload;
      state.cartItems.splice(index, 1);
    },

    // todo: get total price
    setTotalPrice: (state) => {
      const total = state.cartItems.reduce((sum, item) => sum + item.price, 0);
      state.total = total;
    },
    // todo: get total item count
    setCartCount: (state) => {
      const count = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.items = count;
    },

    // todo: reset cart
    resetCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.items = 0;
    },

    // todo: show and hide alert popup
    showAlert: (state) => {
      state.cartAlert = true;
    },
    hideAlert: (state) => {
      state.cartAlert = false;
    },

    // todo: clear all items from cart
    clearFullCart: (state) => {
      state.cartItems = [];
      return state;
    },
  },
});

export const {
  addItemToCart,
  setCartCount,
  setTotalPrice,
  addOneItem,
  removeOneItem,
  removeAllItem,
  resetCart,
  showAlert,
  hideAlert,
  clearFullCart,
} = cartSlice.actions;

export default cartSlice.reducer;
