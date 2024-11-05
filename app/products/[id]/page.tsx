'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import AddToBagButton from '@/app/components/AddToBag'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  quanity: number
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string
    reviewerName: string
  }[]
  returnPolicy: string
  thumbnail: string
}

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error('Error fetching product details:', error))
    }
  }, [id])

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
              className="transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
            {product.discountPercentage > 0 && (
              <div className="text-lg text-gray-500 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </div>
            )}
            {product.discountPercentage > 0 && (
              <div className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                {product.discountPercentage.toFixed(0)}% OFF
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-lg text-gray-700">{product.rating.toFixed(1)}</span>
          </div>

          <AddToBagButton product={product} />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Brand:</p>
              <p>{product.brand}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">SKU:</p>
              <p>{product.sku}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Weight:</p>
              <p>{product.weight}g</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Dimensions:</p>
              <p>
                {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Availability:</p>
              <p>{product.availabilityStatus}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Warranty:</p>
              <p>{product.warrantyInformation}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-gray-700">Shipping Information:</p>
            <p>{product.shippingInformation}</p>
            <p className="font-semibold text-gray-700">Return Policy:</p>
            <p>{product.returnPolicy}</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="font-semibold text-gray-700">{review.reviewerName}</span>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 bg-gray-100 p-4 rounded-lg">No reviews available for this product.</p>
        )}
      </div>
    </section>
  )
}