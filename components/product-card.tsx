"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false)

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
          </div>
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <Badge variant="outline" className="ml-2">
                ${product.price.toFixed(2)}
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
          </DialogHeader>
          <div className="relative h-48 w-full mb-4">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-4">
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="recipe" className="mt-4">
              <ol className="text-sm text-muted-foreground list-decimal pl-5">
                {product.recipe.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </TabsContent>
          </Tabs>
          <DialogFooter className="flex flex-col items-stretch gap-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Added on {formatDate(product.dateAdded)}</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                ${product.price.toFixed(2)}
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={closeDialog}
              className="w-full bg-black text-white hover:bg-gray-800 hover:text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

