"use client"

import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import React from "react"

interface HeaderProps {
  showBackButton?: boolean
  title?: string
}

export function Header({ showBackButton = false, title = "BAR" }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center">
          {showBackButton && (
            <Button variant="outline" size="icon" onClick={() => router.push("/")} className="mr-4 h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>
    </header>
  )
}
