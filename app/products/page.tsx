'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
}

export default function AmazonLikeProductSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [productsPerPage] = useState<number>(12) // Number of products to display per page
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`)
        const data = await res.json()
        setProducts(data.products)
        setTotalProducts(data.total)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, productsPerPage])

  const totalPages = Math.ceil(totalProducts / productsPerPage)

  return (
    <section className="py-12 px-4">
    <div className="container mx-auto max-w-[1400px]">
      <h2 className="text-sm font-light mb-8 text-gray-600 tracking-wider">
        SHOWING {products.length} PRODUCTS
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {loading ? (
          <p className="text-sm text-gray-500">Loading collection...</p>
        ) : (
          products.map((product) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id}
              className="group"
            >
              <div className="space-y-4">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-light tracking-wider">{product.title}</h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) 
                              ? "text-gray-900 fill-current" 
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm text-gray-900">${product.price}</span>
                  </div>
                </div>

                <button 
                  className="w-full py-3 px-4 bg-black text-white text-xs tracking-wider hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center items-center space-x-8">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1} 
          className="p-2 disabled:opacity-30 hover:text-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-light">
          PAGE {currentPage} OF {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages} 
          className="p-2 disabled:opacity-30 hover:text-gray-600 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
  )
}
