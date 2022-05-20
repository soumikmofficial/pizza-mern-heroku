import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: null,
  pizzas: [],
  filteredPizzas: [],
};
const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.modal = payload;
    },
    hideModal: (state) => {
      state.modal = null;
    },
    setPizzas: (state, { payload }) => {
      state.pizzas = payload;
    },
    setFilteredPizzas: (state, { payload }) => {
      const { input, category } = payload;
      const regex = new RegExp(input, "i");
      let filteredPizzas = state.pizzas;
      if (category !== "all") {
        filteredPizzas = state.pizzas.filter(
          (item) => item.category === category
        );
      }
      if (input) {
        filteredPizzas = filteredPizzas.filter((item) => regex.test(item.name));
      }
      state.filteredPizzas = filteredPizzas;
    },
  },
  extraReducers: {},
});

export const { showModal, hideModal, setFilteredPizzas, setPizzas } =
  pizzaSlice.actions;
export default pizzaSlice.reducer;
