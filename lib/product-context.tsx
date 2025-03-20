"use client"

import React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "./types"

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  incrementCount: (id: string) => Promise<void>
  resetCount: (id: string) => Promise<void>
  addProduct: (product: Omit<Product, "id" | "count" | "dateAdded">) => Promise<void>
  refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/products")
  
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
  
      const data = await response.json()
  
      // Map each product, converting _id to id and removing _id if desired
      const productsWithId = data.map((product: Product & { _id: string }) => ({
        ...product,
        id: product._id.toString(),
      }))
  
      setProducts(productsWithId)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const refreshProducts = async () => {
    await fetchProducts()
  }

  const incrementCount = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}/count`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "increment" }),
      })

      if (!response.ok) {
        throw new Error("Failed to increment count")
      }

      const updatedProduct = await response.json()

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? { ...product, count: updatedProduct.count } : product)),
      )
    } catch (err) {
      console.error("Error incrementing count:", err)
      setError("Failed to update count. Please try again later.")
    }
  }

  const resetCount = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}/count`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reset" }),
      })

      if (!response.ok) {
        throw new Error("Failed to reset count")
      }

      await response.json()

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? { ...product, count: 0 } : product)),
      )
    } catch (err) {
      console.error("Error resetting count:", err)
      setError("Failed to reset count. Please try again later.")
    }
  }

  const addProduct = async (product: Omit<Product, "id" | "count" | "dateAdded">) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error("Failed to add product")
      }

      await fetchProducts() // Refresh the products list
    } catch (err) {
      console.error("Error adding product:", err)
      setError("Failed to add product. Please try again later.")
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        incrementCount,
        resetCount,
        addProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

