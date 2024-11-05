// AddToBagButton.tsx

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToBag, removeFromBag } from '../store/cartSlice'; // Import removeFromBag
import { RootState } from '../store/store'; // Adjust the path as necessary
import { Product } from '../types/types'; // Adjust the path as necessary

interface AddToBagButtonProps {
  product: Product;
}

const AddToBagButton: React.FC<AddToBagButtonProps> = ({ product }) => {
  const dispatch = useDispatch(); // Initialize the Redux dispatch
  const itemsInBag = useSelector((state: RootState) => state.cart.items); // Get items in the bag from Redux store

  // Function to check if the product is already in the bag
  const isProductInBag = (productId: number) => {
    return itemsInBag.some(item => item.id === productId);
  };

  const handleToggleBag = () => {
    if (isProductInBag(product.id)) {
      dispatch(removeFromBag(product.id)); // Remove the product from the bag
    } else {
      dispatch(addToBag(product)); // Add the product to the bag
    }
  };

  return (
    <button 
    onClick={handleToggleBag} // Call the function on button click
    className={`py-3 px-4 bg-black text-white text-xs tracking-wider flex items-center justify-center space-x-2 transition-opacity ${isProductInBag(product.id) ? 'opacity-100' : ''}`}
    disabled={false} // Always enable the button, as we want to allow removing the item
  >
    <ShoppingBag className="w-4 h-4" />
    <span>{isProductInBag(product.id) ? 'REMOVE' : 'ADD TO BAG'}</span>
  </button>
  
  );
};

export default AddToBagButton;
