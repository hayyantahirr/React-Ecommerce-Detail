import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, data) => {
      console.log("Data ===>", data);
      if (state.cart.length > 0) {
        let itemExist = state.cart.find((item) => item.id === data.payload.id);
        if (itemExist) {
          itemExist.quantity += data.payload.quantity;
        } else {
          data.payload.quantity = 1;
          state.cart.push(data.payload);
        }
      } else {
        data.payload.quantity = 1;
        state.cart.push(data.payload);
      }
    },
    increment: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cart[index].quantity += 1;
      }
    },
    decrement: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else if (index !== -1 && state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },
    removeFromCart: (state, data) => {
      state.cart = state.cart.filter((item) => item.id !== data.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
