"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductProvider, useProducts } from "@/lib/product-context"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddProductDialog } from "../components/add-product-dialog"

type FilterType = "all" | "cocktail" | "tapas"

function HomePage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const { products, loading, error } = useProducts()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.type === filter)

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Menu</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as FilterType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cocktail">Cocktails</TabsTrigger>
              <TabsTrigger value="drink">Tapas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 rounded-md bg-red-50">
            {error}
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-muted-foreground p-8">No items found. Add some items to get started.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <AddProductDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
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

