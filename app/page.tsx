"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { menuItems } from "@/lib/menuItems";

export default function MenuPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">F&M</h1>
        <p className="text-muted-foreground mt-2">Select your experience</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => router.push(item.path)}
              className="cursor-pointer"
            >
              <Card
                className={`overflow-hidden h-full shadow-md transition-shadow duration-300 ${
                  hoveredCard === item.id ? "shadow-lg" : ""
                }`}
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative h-48 w-full rounded-md overflow-hidden mb-6">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <Button className={`w-full ${hoveredCard === item.id ? "bg-black text-white" : ""}`}>
                    Enter {item.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} F&M. All rights reserved.</p>
      </footer>
    </div>
  )
}