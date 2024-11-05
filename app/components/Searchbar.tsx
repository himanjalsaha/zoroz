"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Product } from '../types/types';

const SearchBar = ({ placeholder = "Search", className = "" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        try {
          const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
          const data = await response.json();
          setResults(data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setResults([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 700);

    return () => {
      clearTimeout(debounceFetch);
    };
  }, [query]);

  return (
    <div className={`relative ${className}`}>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-gray-50 border-none rounded-none focus:ring-0 focus:outline-none text-sm"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-1 w-full">
          {results.map((product) => (
            <li key={product.id} onClick={() => setQuery("")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href={`/products/${product.id}`} className="block">
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
