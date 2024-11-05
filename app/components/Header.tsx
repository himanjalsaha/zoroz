import { Globe,  ReceiptIcon, ShoppingBag, User } from 'lucide-react';
import React from 'react';
import SearchBar from './Searchbar';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path as necessary

const Header = () => {

  const itemsInBag = useSelector((state: RootState) => state.cart.items);
  const bagCount = itemsInBag.length; // Count of items in the bag
  const orders = useSelector((state: RootState) => state.cart.orders);
 
  const ordersCount = orders.length;
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
          <Link href='/products'>all products</Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-wider">ZOROZ</Link>

          {/* Utilities */}
          <div className="flex items-center space-x-6">
            <button className="hidden md:block hover:text-gray-600 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button className="hidden md:block hover:text-gray-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
           
            <Link href="/bag" className="relative hover:text-gray-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {bagCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </Link>
            <Link href="/orders" className="relative hover:text-gray-600 transition-colors">
              <ReceiptIcon className="w-5 h-5" />
              {ordersCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
