"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { CalendarDays, PlusCircle, RotateCcw } from "lucide-react"
import { useProducts } from "@/lib/product-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { incrementCount, resetCount } = useProducts()

  const closeDialog = () => setIsOpen(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="h-full"
      >
        <Card className="overflow-hidden cursor-pointer h-full flex flex-col" onClick={() => setIsOpen(true)}>
          <div className="relative h-48 w-full">
            <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="capitalize">
                {product.type}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <Badge variant="outline" className="ml-2">
                Made: {product.count}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm flex-1">{product.shortDescription}</p>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">{product.name}</DialogTitle>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-2" />
              Added {formatDate(product.dateAdded)}
            </div>
          </DialogHeader>

          <div className="relative h-48 w-full mb-4">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="capitalize">
                {product.type}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Info</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
              <TabsTrigger value="counter">Counter</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-muted-foreground py-1 px-2 rounded-md bg-secondary/50"
                    >
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recipe" className="mt-4">
              <div className="space-y-2">
                {product.recipe.map((step, index) => (
                  <div key={index} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{index + 1}.</span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="counter" className="mt-4">
              <div className="flex flex-col items-center space-y-6 py-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Times Made</h3>
                  <div className="text-5xl font-bold">{product.count}</div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementCount(product.id)}
                    className="h-12 w-12"
                  >
                    <PlusCircle className="h-6 w-6" />
                    <span className="sr-only">Increment</span>
                  </Button>

                  <Button variant="outline" size="icon" onClick={() => resetCount(product.id)} className="h-12 w-12">
                    <RotateCcw className="h-6 w-6" />
                    <span className="sr-only">Reset</span>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  {`Track how many times you've made this {product.type}. Click + to increment or the reset button to
                  start over.`}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 mb-4">
            <Badge variant="secondary" className="w-full flex justify-center py-2 text-lg">
              Made: {product.count} times
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={closeDialog}
            className="w-full bg-black text-white hover:bg-gray-800 hover:text-white"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}