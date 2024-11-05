"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Link from 'next/link';

const CheckedOutOrders: React.FC = () => {
  const orders = useSelector((state: RootState) => state.cart.orders);

  // Calculate total price of all orders
  const totalPrice = orders.reduce((total, order) => {
    const orderTotal = order.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    return total + orderTotal;
  }, 0);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-[1400px]">
        <h2 className="text-2xl font-bold mb-6">Your Checked-Out Orders</h2>

        {orders.length === 0 ? (
          <p className="text-lg text-gray-500">You have no checked-out orders.</p>
        ) : (
          <>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Order ID</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Items</th>
                  <th className="border border-gray-300 px-4 py-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const orderTotal = order.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

                  return (
                    <tr key={order.id}>
                      <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{new Date(order.date).toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <ul>
                          {order.items.map(item => (
                            <li key={item.id} className="flex justify-between">
                              <Link className='hover:text-blue-800' href={`/products/${item.id}`}>{item.title} (x{item.quantity || 1})</Link>
                              <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">${orderTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-6">
              <h3 className="text-xl font-bold">Total Price of All Orders: ${totalPrice.toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CheckedOutOrders;
