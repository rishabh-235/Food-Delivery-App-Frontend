import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.totalAmount += item.rate;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === itemId);
      if (existingItem) {
        state.totalAmount -= existingItem.rate * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i._id !== itemId);
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === itemId);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.rate;
      } else {
        state.cartItems = state.cartItems.filter((i) => i._id !== itemId);
        state.totalAmount -= existingItem.rate;
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;