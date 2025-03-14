"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "./types"
import { getProducts } from "./data"

interface ProductContextType {
  products: Product[]
  incrementCount: (id: string) => void
  resetCount: (id: string) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Initialize products from data
    setProducts(getProducts())
  }, [])

  const saveCountsToLocalStorage = (updatedProducts: Product[]) => {
    const counts = updatedProducts.reduce(
      (acc, product) => {
        acc[product.id] = product.count
        return acc
      },
      {} as Record<string, number>,
    )

    localStorage.setItem("productCounts", JSON.stringify(counts))
  }

  const incrementCount = (id: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id ? { ...product, count: product.count + 1 } : product,
      )
      saveCountsToLocalStorage(updatedProducts)
      return updatedProducts
    })
  }

  const resetCount = (id: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => (product.id === id ? { ...product, count: 0 } : product))
      saveCountsToLocalStorage(updatedProducts)
      return updatedProducts
    })
  }

  return <ProductContext.Provider value={{ products, incrementCount, resetCount }}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

