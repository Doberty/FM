"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ProductProvider, useProducts } from "@/lib/product-context"

type FilterType = "all" | "cocktail" | "tapas"

function HomePage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const { products } = useProducts()

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.type === filter)

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>

        <div className="max-w-md mx-auto mb-8">
          <Tabs defaultValue="cocktail" className="w-full" onValueChange={(value) => setFilter(value as FilterType)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cocktail">Cocktails</TabsTrigger>
              <TabsTrigger value="tapas">Tapas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  )
}

export default function Home() {
  return (
    <ProductProvider>
      <HomePage />
    </ProductProvider>
  )
}

