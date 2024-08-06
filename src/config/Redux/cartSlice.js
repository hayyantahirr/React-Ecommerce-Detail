import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, data) => {
        console.log("Data ===>",data);
        
           
       

      state.cart.push(data.payload);
    },
    removeFromCart: (state, data) => {
      state.cart = state.cart.splice(data.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart ,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
