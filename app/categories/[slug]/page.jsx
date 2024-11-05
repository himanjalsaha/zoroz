

'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductShowcase from '@/app/components/Productshowcase'

const Page = () => {
  const params = useParams()
  const { slug } = params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); 
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${slug}?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug, currentPage,productsPerPage]); // Re-run the effect if slug or currentPage changes

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl font-light text-center mb-12">{slug} Products</h1>
      <ProductShowcase 
        products={products} 
        loading={loading} 
        error={error} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages} 
      />
    </div>
  )
}

export default Page;
