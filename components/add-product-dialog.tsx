"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProducts } from "@/lib/product-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const { addProduct } = useProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    type: "cocktail",
    price: "",
    imageUrl: "/placeholder.svg?height=400&width=400",
    ingredients: "",
    recipe: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Parse ingredients and recipe from text to arrays
      const ingredients = formData.ingredients.split("\n").filter((line) => line.trim() !== "")

      const recipe = formData.recipe.split("\n").filter((line) => line.trim() !== "")

      await addProduct({
        name: formData.name,
        shortDescription: formData.shortDescription,
        description: formData.description,
        type: formData.type as "cocktail" | "tapas",
        price: Number.parseFloat(formData.price) || 0,
        imageUrl: formData.imageUrl,
        ingredients,
        recipe,
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        shortDescription: "",
        description: "",
        type: "cocktail",
        price: "",
        imageUrl: "/placeholder.svg?height=400&width=400",
        ingredients: "",
        recipe: "",
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cocktail">Cocktail</SelectItem>
                      <SelectItem value="tapas">Tapas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="/placeholder.svg?height=400&width=400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients (one per line)</Label>
                <Textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Gin
Fresh Lime Juice
Simple Syrup
Soda Water"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipe">Recipe Steps (one per line)</Label>
                <Textarea
                  id="recipe"
                  name="recipe"
                  value={formData.recipe}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add ice to a shaker
Add gin, lime juice, and simple syrup
Shake well
Strain into a glass and top with soda water"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white hover:bg-gray-800">
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

