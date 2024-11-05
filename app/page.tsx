"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart, FileText, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from './types/types';

const LuxuryHomepage = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Use the Category type here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify error type

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.slice(0, 8)); // Limit to 8 categories for better layout
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const categoryImages: { [key: string]: string } = {
    Beauty: "https://www.ogbeauty.in/cdn/shop/files/OG_Beauty_Luxury_Solace_Listing_1-1.jpg?v=1698674492",
    Fragrances: "https://iberchem.com/wp-content/uploads/2020/12/2021-Fine-Fragrance-Trends-Iberchem-1024x683.jpg",
    Furniture: "https://www.alankaram.in/wp-content/uploads/2022/12/A7402720-2048x1365-1.jpg",
    Groceries: "https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?cs=srgb&dl=pexels-carlo-martin-alcordo-1279322-2449665.jpg&fm=jpg",
    "Home Decoration": "https://www.centuryply.com/assets/img/blog/25-08-22/11.jpg",
    "Kitchen Accessories": "https://m.media-amazon.com/images/I/41UfslaR6-L._AC_UF1000,1000_QL80_.jpg",
    Laptops: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "Mens Shirts": "https://assets.ajio.com/medias/sys_master/root/20240507/mdc0/663a557116fd2c6e6af0ef6f/-473Wx593H-467293008-brown-MODEL.jpg"
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-light text-center mb-12">Choose a department</h1>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name.trim().replace(/\s+/g, '-').toLowerCase()} href={`/categories/${category.name.trim().replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="relative group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                  width={200}
                  height={200}
                    src={categoryImages[category.name] || 'https://via.placeholder.com/500'} // Fallback image if not found
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <h2 className="text-white text-2xl md:text-3xl font-light tracking-wider">{category.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Service Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="text-center">
            <ShoppingCart className="w-6 h-6 mx-auto mb-4" />
            <h3 className="text-sm font-medium mb-2">HOW TO SHOP</h3>
            <p className="text-sm text-gray-600">Your guide to shopping and placing orders</p>
          </div>
          <div className="text-center">
            <FileText className="w-6 h-6 mx-auto mb-4" />
            <h3 className="text-sm font-medium mb-2">FAQS</h3>
            <p className="text-sm text-gray-600">Your questions answered</p>
          </div>
          <div className="text-center">
            <HelpCircle className="w-6 h-6 mx-auto mb-4" />
            <h3 className="text-sm font-medium mb-2">NEED HELP?</h3>
            <p className="text-sm text-gray-600">Contact our global Customer Service team</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LuxuryHomepage;
