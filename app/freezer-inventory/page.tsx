"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { PlusCircle } from "lucide-react"
import { FreezerItemForm } from "./freezer-item-form"
import { FreezerItemList } from "./freezer-item-list"
import { Drawer, DrawerContent, DrawerTrigger } from "../../components/ui/drawer"
import type { FreezerItem } from "../../lib/types"
import { toast } from "sonner"
import React from "react"
import { Header } from "../../components/header"

export default function FreezerInventoryPage() {
  const [items, setItems] = useState<FreezerItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/freezer-items")
      const data = await response.json()
      setItems(data)
    } catch (error) {
      toast.error("Failed to fetch freezer items")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddItem = async (item: Omit<FreezerItem, "id" | "consumed">) => {
    try {
      const response = await fetch("/api/freezer-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })

      if (!response.ok) throw new Error("Failed to add item")

      await fetchItems()
      setDrawerOpen(false)
      toast.success("Item added to freezer inventory")
    } catch (error) {
      toast.error("Failed to add item")
      console.error(error)
    }
  }

  const handleMarkAsConsumed = async (id: string) => {
    try {
      const response = await fetch(`/api/freezer-items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ consumed: true }),
      })

      if (!response.ok) throw new Error("Failed to update item")

      await fetchItems()
      toast.success("Item marked as consumed")
    } catch (error) {
      toast.error("Failed to update item")
      console.error(error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/freezer-items/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete item")

      await fetchItems()
      toast.success("Item deleted from freezer inventory")
    } catch (error) {
      toast.error("Failed to delete item")
      console.error(error)
    }
  }

  const proteinItems = items.filter((item) => item.type === "protein" && !item.consumed)
  const vegetableItems = items.filter((item) => item.type === "vegetable" && !item.consumed)
  const mealItems = items.filter((item) => item.type === "meal" && !item.consumed)
  const notConsumedItems = items.filter((item) => !item.consumed)

  return (
    <>
      <Header showBackButton={true} title="Freezer" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Freezer Inventory</h1>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-lg p-6">
                <FreezerItemForm onSubmit={handleAddItem} onCancel={() => setDrawerOpen(false)} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="protein">Protein</TabsTrigger>
            <TabsTrigger value="vegetable">Vegetables</TabsTrigger>
            <TabsTrigger value="meal">Meal</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <FreezerItemList
              items={notConsumedItems}
              onMarkAsConsumed={handleMarkAsConsumed}
              onDelete={handleDeleteItem}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="protein">
            <FreezerItemList
              items={proteinItems}
              onMarkAsConsumed={handleMarkAsConsumed}
              onDelete={handleDeleteItem}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="vegetable">
            <FreezerItemList
              items={vegetableItems}
              onMarkAsConsumed={handleMarkAsConsumed}
              onDelete={handleDeleteItem}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="meal">
            <FreezerItemList
              items={mealItems}
              onMarkAsConsumed={handleMarkAsConsumed}
              onDelete={handleDeleteItem}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
