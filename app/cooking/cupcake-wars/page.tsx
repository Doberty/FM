"use client"
import { Header } from "../../../components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs"
import { CalendarDays, Trophy, Clock } from "lucide-react"
import { CompetitionTimeline } from "../../../components/competition-timeline"
import { competitions } from "../../../lib/wars-data"
import { LeaderboardSection } from "../../../components/leaderboard-section"
import React from "react"

export default function CupcakeWarsPage() {
  const cupcakeWarsCompetitions = competitions.filter((comp) => comp.type === "cupcake-wars")

  const upcomingCompetitions = cupcakeWarsCompetitions.filter((comp) => comp.status === "upcoming")
  const ongoingCompetitions = cupcakeWarsCompetitions.filter((comp) => comp.status === "ongoing")
  const completedCompetitions = cupcakeWarsCompetitions.filter((comp) => comp.status === "completed")

  return (
    <>
      <Header showBackButton={true} title="CUPCAKE WARS" />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="hidden sm:inline">Ongoing</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Completed</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Competition Timeline</CardTitle>
                  <CardDescription>All our past, present, and future competitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompetitionTimeline competitions={cupcakeWarsCompetitions} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Competitions</CardTitle>
                  <CardDescription>Get ready to participate in these competitions</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingCompetitions.length > 0 ? (
                    <CompetitionTimeline competitions={upcomingCompetitions} />
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No upcoming competitions scheduled at this time.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ongoing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ongoing Competitions</CardTitle>
                  <CardDescription>Competitions that are currently in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {ongoingCompetitions.length > 0 ? (
                    <CompetitionTimeline competitions={ongoingCompetitions} />
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No ongoing competitions at this time.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Competitions</CardTitle>
                  <CardDescription>Review the results of our past competitions</CardDescription>
                </CardHeader>
                <CardContent>
                {completedCompetitions.length > 0 ? (
                    <>
                      <Card className="mb-8 border-dashed border-amber-200">
                        <CardContent className="pt-6">
                          <LeaderboardSection />
                        </CardContent>
                      </Card>

                      <CompetitionTimeline competitions={completedCompetitions} />
                    </>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No completed competitions to show.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}