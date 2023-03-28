import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      state.amount -= 1;
    },
    toggleAmount: (state, action) => {
      const { type, id } = action.payload;
      if (type === 'inc') {
        const cartItem = state.cartItems.find(item => item.id === id);
        console.log(cartItem);
        cartItem.amount += 1;
        state.amount += 1;
      } else if (type === 'dec') {
        const cartItem = state.cartItems.find(item => item.id === id);
        cartItem.amount -= 1;
        state.amount -= 1;
      } else {
        // do nothing
      }
    },
    calculateTotal: (state, action) => {
      console.log(action);
      const cartItem = state.cartItems.find(item => item.id === action.payload);
      state.total = cartItem.amount * cartItem.price;
    },
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, toggleAmount, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
