'use client';


import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {  ProductShowcaseProps } from '../types/types';

import AddToBagButton from './AddToBag';

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-lg font-medium mb-8 text-gray-700 tracking-wide text-center">
          Showing {products.length} Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white shadow-sm rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
                <Link href={`/products/${product.id}`} className="aspect-square relative block overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                    <AddToBagButton product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1} 
            className="p-2 rounded-full bg-white shadow-sm disabled:opacity-50 hover:bg-gray-100 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages} 
            className="p-2 rounded-full bg-white shadow-sm disabled:opacity-50 hover:bg-gray-100 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;