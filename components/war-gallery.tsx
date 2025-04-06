"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cake, ChefHat, Flame, Camera, Sparkles } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import React from "react"

interface GalleryPhoto {
  _id: string
  war_id: string
  url: string
  caption?: string
  category: "preparation" | "action" | "final" | "behind-the-scenes"
}

interface WarGalleryProps {
  warId: string
  className?: string
}

export function WarGallery({ warId, className }: WarGalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  useEffect(() => {
    async function fetchWarPhotos() {
      try {
        setLoading(true)
        const response = await fetch(`/api/war-photos?warId=${warId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch war photos")
        }

        const data = await response.json()
        setPhotos(data.photos || [])
      } catch (err) {
        console.error("Error fetching war photos:", err)
        setError("Failed to load war photos")
      } finally {
        setLoading(false)
      }
    }

    if (warId) {
      fetchWarPhotos()
    }
  }, [warId])

  // Group photos by category
  const preparationPhotos = photos.filter((photo) => photo.category === "preparation")
  const actionPhotos = photos.filter((photo) => photo.category === "action")
  const finalPhotos = photos.filter((photo) => photo.category === "final")
  const behindTheScenes = photos.filter((photo) => photo.category === "behind-the-scenes")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "preparation":
        return <ChefHat className="h-4 w-4" />
      case "action":
        return <Flame className="h-4 w-4" />
      case "final":
        return <Cake className="h-4 w-4" />
      case "behind-the-scenes":
        return <Camera className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "preparation":
        return "Dough Prep"
      case "action":
        return "Baking Mayhem"
      case "final":
        return "Final Creations"
      case "behind-the-scenes":
        return "Behind the Scenes"
      default:
        return category
    }
  }

  if (loading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="p-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-4 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="p-6 text-center text-red-500">
          <p>{error}</p>
        </div>
      </Card>
    )
  }

  if (photos.length === 0) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="p-6 text-center text-muted-foreground">
          <p>No war photos available for this competition</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <Tabs defaultValue="all" className="w-full">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Camera className="h-5 w-5 text-muted-foreground" />
            War Chronicles
          </h3>
          <TabsList className="grid grid-cols-5 h-8">
            <TabsTrigger value="all" className="text-xs px-2">
              All
            </TabsTrigger>
            <TabsTrigger value="preparation" className="text-xs px-2 flex items-center gap-1">
              <ChefHat className="h-3 w-3" />
              <span className="hidden sm:inline">Prep</span>
            </TabsTrigger>
            <TabsTrigger value="action" className="text-xs px-2 flex items-center gap-1">
              <Flame className="h-3 w-3" />
              <span className="hidden sm:inline">Mayhem</span>
            </TabsTrigger>
            <TabsTrigger value="final" className="text-xs px-2 flex items-center gap-1">
              <Cake className="h-3 w-3" />
              <span className="hidden sm:inline">Finals</span>
            </TabsTrigger>
            <TabsTrigger value="behind-the-scenes" className="text-xs px-2 flex items-center gap-1">
              <Camera className="h-3 w-3" />
              <span className="hidden sm:inline">BTS</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <PhotoGrid photos={photos} setSelectedPhoto={setSelectedPhoto} />
        </TabsContent>

        <TabsContent value="preparation" className="mt-0">
          <PhotoGrid photos={preparationPhotos} setSelectedPhoto={setSelectedPhoto} />
        </TabsContent>

        <TabsContent value="action" className="mt-0">
          <PhotoGrid photos={actionPhotos} setSelectedPhoto={setSelectedPhoto} />
        </TabsContent>

        <TabsContent value="final" className="mt-0">
          <PhotoGrid photos={finalPhotos} setSelectedPhoto={setSelectedPhoto} />
        </TabsContent>

        <TabsContent value="behind-the-scenes" className="mt-0">
          <PhotoGrid photos={behindTheScenes} setSelectedPhoto={setSelectedPhoto} />
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          <div className="relative">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {selectedPhoto && (
                <Image
                  src={selectedPhoto.url || "/placeholder.svg"}
                  alt={selectedPhoto.caption || "Cupcake war photo"}
                  fill
                  className="object-contain"
                />
              )}
            </AspectRatio>
            {selectedPhoto && selectedPhoto.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-black/50 text-white border-none">
                    {getCategoryIcon(selectedPhoto.category)}
                    <span className="ml-1">{getCategoryName(selectedPhoto.category)}</span>
                  </Badge>
                </div>
                <p className="text-white text-sm">{selectedPhoto.caption}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function PhotoGrid({
  photos,
  setSelectedPhoto,
}: {
  photos: GalleryPhoto[]
  setSelectedPhoto: (photo: GalleryPhoto) => void
}) {
  if (photos.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No photos available in this category</div>
  }

  return (
    <div className="p-1">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex flex-wrap gap-2 p-2">
          {photos.map((photo) => (
            <Dialog key={photo._id}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto rounded-md overflow-hidden"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative w-[150px] h-[100px] md:w-[200px] md:h-[133px] overflow-hidden group">
                    <Image
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.caption || "Cupcake war photo"}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="outline" className="bg-black/50 text-white border-none text-xs">
                          {photo.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Button>
              </DialogTrigger>
            </Dialog>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

