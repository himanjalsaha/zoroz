import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types';

interface Order {
  id: number;
  items: Product[];
  totalPrice: number;
  date: string;
}

interface CartState {
  items: Product[];
  orders: Order[];
}

const initialState: CartState = {
  items: [],
  orders: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToBag: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromBag: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearBag: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    checkout: (state) => {
      const totalPrice = state.items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
      const newOrder: Order = {
        id: Date.now(),
        items: [...state.items],
        totalPrice,
        date: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(state.orders));
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { addToBag, removeFromBag, clearBag, checkout, setCartItems, setOrders } = cartSlice.actions;
export default cartSlice.reducer;
