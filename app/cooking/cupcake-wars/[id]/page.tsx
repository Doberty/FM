"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "../../../../components/header"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card"
import { cupcakeCompetitions } from "../../../../lib/wars-data"
import { ArrowLeft } from "lucide-react"
import React from "react"

export default function CompetitionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const competition = cupcakeCompetitions.find((comp) => comp.id === id)

  if (!competition) {
    return (
      <>
        <Header showBackButton={true} title="COMPETITION NOT FOUND" />
        <main className="container mx-auto py-12 px-4 text-center">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The competition you&apos;re looking for doesn&apos;t exist.</p>
              <Button onClick={() => router.push("/cooking/cupcake-wars")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cupcake Wars
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Header showBackButton={true} title={competition.title.toUpperCase()} />
      <main className="container mx-auto py-12 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{competition.title}</CardTitle>
            <CardDescription>
              {new Date(competition.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">{competition.description}</p>

            <div className="p-8 text-center bg-secondary rounded-md">
              <h2 className="text-xl font-medium mb-4">Competition Details</h2>
              <p>This page is under development. Check back soon for full competition details!</p>
            </div>

            <div className="mt-6 flex justify-center">
              <Button onClick={() => router.push("/cooking/cupcake-wars")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cupcake Wars
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

