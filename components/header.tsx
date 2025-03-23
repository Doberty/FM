"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

interface HeaderProps {
  showBackButton?: boolean
  title?: string
}

export function Header({ showBackButton = false, title = "BAR" }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/")}
                className="mr-4 h-8 w-8 border-gray-300"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="text-muted-foreground">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </header>
  )
}

