"use client"

import { Beef, Carrot, Check, MoreHorizontal, Package, Trash2 } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Skeleton } from "../../components/ui/skeleton"
import type { FreezerItem } from "../../lib/types"
import { Badge } from "../../components/ui/badge"
import React from "react"

interface FreezerItemListProps {
  items: FreezerItem[]
  onMarkAsConsumed: (id: string) => void
  onDelete: (id: string) => void
  isConsumedList?: boolean
  isLoading?: boolean
}

export function FreezerItemList({
  items,
  onMarkAsConsumed,
  onDelete,
  isConsumedList = false,
  isLoading = false,
}: FreezerItemListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {isConsumedList ? "No consumed items yet" : "No items added yet. Add some items to get started!"}
      </div>
    )
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "protein":
        return <Beef className="h-8 w-8 text-rose-500" />
      case "vegetable":
        return <Carrot className="h-8 w-8 text-orange-500" />
      default:
        return <Package className="h-8 w-8 text-purple-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {items.map((item) => (
        <Card key={item.id} className={isConsumedList ? "opacity-70" : ""}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getItemIcon(item.type)}
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Added: {formatDate(item.dateAdded)}</p>
                  {item.quantity && (
                    <Badge variant="outline" className="mt-1">
                      {item.quantity}
                    </Badge>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!isConsumedList && (
                    <DropdownMenuItem onClick={() => onMarkAsConsumed(item.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Mark as consumed
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onDelete(item.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
