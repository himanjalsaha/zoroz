"use client";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { checkout, removeFromBag, clearBag } from '../store/cartSlice';
import Image from 'next/image';
import { useState } from 'react';
import { Trash2, ShoppingBag, X } from 'lucide-react';

const Bag: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  const handleRemoveFromBag = (id: number) => {
    dispatch(removeFromBag(id));
  };

  const clearAll = () => {
    dispatch(clearBag());
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setPaymentSuccess(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() > 0.2;
    if (success) {
      dispatch(checkout());
      setPaymentSuccess(true);
    } else {
      setPaymentSuccess(false);
    }

    setIsLoading(false);
  };

  const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <section className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <ShoppingBag className="mr-2" /> Your Bag
            </h2>
          </div>
          
          {items.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-lg text-gray-500">Your bag is empty.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {items.map(item => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image width={80} height={80} src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Quantity: {item.quantity || 1}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveFromBag(item.id)} 
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Remove ${item.title} from bag`}
                  >
                    <X size={24} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={clearAll}
                  className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                >
                  <Trash2 size={18} className="mr-1" /> Clear All
                </button>
                <h3 className="text-xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h3>
              </div>
              <button 
                onClick={handleCheckout} 
                className={`w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          )}
        </div>

        {paymentSuccess !== null && (
          <div className={`mt-6 p-4 rounded-md ${paymentSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="text-center text-lg font-semibold">
              {paymentSuccess ? 'Payment Successful! Thank you for your order!' : 'Payment Failed! Please try again.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bag;