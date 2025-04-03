"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "../../components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export default function CookingWarsPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const cookingCompetitions = [
    {
      id: "cupcake-wars",
      title: "Cupcake Wars",
      description: "The epic battles of Francisco vs. Martina where flour flies, frosting wars rage, and only the best cupcake reigns supreme!",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/cupcake-VJGzU7N0lCzKZlKTCW5lPJIfFyrKfy.webp",
      path: "/cooking/cupcake-wars",
      comingSoon: false,
    },
    {
      id: "masterchef",
      title: "MasterChef",
      description: "Francisco and Martina face off in a culinary showdown where creativity meets chaos, and the secret ingredient is the ultimate twist!",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/masterchef-J5HKuckspbNEbaDZnrQsBp8toR2rRk.png",
      path: "/cooking/master-chef",
      comingSoon: false,
    },
    {
      id: "pizza-challenge",
      title: "Pizza Challenge",
      description: "Francisco and Martina face off in a battle of flavors and crust mastery where every pizza tells a story, but only one can be crowned champion!",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/pizzachalenge-k9RBvZJq9evuVlbKnRjMmXweVZh8e2.png",
      path: "/cooking/pizza-challenge",
      comingSoon: true,
    },
  ]

  return (
    <>
      <Header showBackButton={true} title="COOKING WARS" />
      <main className="container mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our cooking competitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cookingCompetitions.map((competition) => (
            <motion.div
              key={competition.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(competition.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => !competition.comingSoon && router.push(competition.path)}
              className={`cursor-pointer ${competition.comingSoon ? "opacity-80" : ""}`}
            >
              <Card
                className={`overflow-hidden h-full shadow-md transition-shadow duration-300 ${
                  hoveredCard === competition.id ? "shadow-lg" : ""
                }`}
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl">{competition.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{competition.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative h-48 w-full rounded-md overflow-hidden mb-6">
                    <Image
                      src={competition.image || "/placeholder.svg"}
                      alt={competition.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {competition.comingSoon ? (
                    <Button className="w-full" disabled>
                      Coming Soon
                    </Button>
                  ) : (
                    <Button className={`w-full ${hoveredCard === competition.id ? "bg-black text-white" : ""}`}>
                      Enter Competition
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  )
}

