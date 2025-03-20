import React from "react"
import { Card, CardContent } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-16 ml-2" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardContent>
    </Card>
  )
}

