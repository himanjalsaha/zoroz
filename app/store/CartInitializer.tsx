"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems, setOrders } from '../store/cartSlice';
import { Product, Order } from '../types/types';

const CartInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as Product[];
    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    dispatch(setCartItems(cartItems));
    dispatch(setOrders(orders));
  }, [dispatch]);

  return null;
};

export default CartInitializer;
