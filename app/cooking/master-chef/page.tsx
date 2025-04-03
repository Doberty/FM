"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { masterChefCompetitions } from "../../../lib/master-chef-data"
import { MasterChefTimeline } from "@/components/masterchef-timeline"
import { MasterChefLeaderboard } from "@/components/masterchef-leaderboard"
import { ChefHat, Award, Clock, Users } from "lucide-react"
import React from "react"


export default function MasterChefPage() {
  // Group competitions by type
  const mysteryBoxCompetitions = masterChefCompetitions.filter((comp) => comp.type === "mystery-box")
  const pizzaShowdownCompetitions = masterChefCompetitions.filter((comp) => comp.type === "pizza-showdown")
  const pastryCompetitions = masterChefCompetitions.filter((comp) => comp.type === "pastry-competition")

  // Count statistics
  const totalCompetitions = masterChefCompetitions.length
  const completedCompetitions = masterChefCompetitions.filter((comp) => comp.status === "completed").length
  const ongoingCompetitions = masterChefCompetitions.filter((comp) => comp.status === "ongoing").length
  const upcomingCompetitions = masterChefCompetitions.filter((comp) => comp.status === "upcoming").length

  return (
    <>
      <Header showBackButton={true} title="MASTER CHEF" />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Master Chef Competition</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test your culinary skills in our premier cooking competition. From mystery boxes to pressure tests, only the
            best chef will emerge victorious.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalCompetitions}</div>
                <ChefHat className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{completedCompetitions}</div>
                <Award className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ongoing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{ongoingCompetitions}</div>
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{upcomingCompetitions}</div>
                <Users className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competition Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          {/* Mobile Dropdown for very small screens */}
          <div className="block sm:hidden mb-4">
            <select
              className="w-full p-2 border rounded-md bg-muted text-foreground"
              onChange={(e) => {
                const tabsRoot = document.querySelector("[data-radix-root]")
                if (tabsRoot) {
                  const trigger = tabsRoot.querySelector(`[data-state][value="${e.target.value}"]`)
                  if (trigger) {
                    ;(trigger as HTMLElement).click()
                  }
                }
              }}
            >
              <option value="all">All Challenges</option>
              <option value="mystery-box">Mystery Box</option>
              <option value="pizza-showdown">Pizza Showdown</option>
              <option value="pastry-competition">Pastry Competition</option>
            </select>
          </div>

          {/* Regular tabs for larger screens */}
          <TabsList className="hidden sm:flex flex-wrap gap-2 mb-4 w-full overflow-x-auto">
            <TabsTrigger className="flex-1 min-w-[100px]" value="all">
              All Challenges
            </TabsTrigger>
            <TabsTrigger className="flex-1 min-w-[100px]" value="mystery-box">
              Mystery Box
            </TabsTrigger>
            <TabsTrigger className="flex-1 min-w-[100px]" value="pizza-showdown">
              Pizza Showdown
            </TabsTrigger>
            <TabsTrigger className="flex-1 min-w-[100px]" value="pastry-competition">
              Pastry Competition
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Challenges</CardTitle>
                <CardDescription>View all Master Chef challenges in chronological order</CardDescription>
              </CardHeader>
              <CardContent>
                <MasterChefTimeline competitions={masterChefCompetitions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mystery-box">
            <Card>
              <CardHeader>
                <CardTitle>Mystery Box Challenges</CardTitle>
                <CardDescription>
                  Contestants must create dishes using only the surprise ingredients revealed in their mystery box
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MasterChefTimeline competitions={mysteryBoxCompetitions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pizza-showdown">
            <Card>
              <CardHeader>
                <CardTitle>Pizza Showdown</CardTitle>
                <CardDescription>
                  Contestants compete to create the most innovative and delicious pizzas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MasterChefTimeline competitions={pizzaShowdownCompetitions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pastry-competition">
            <Card>
              <CardHeader>
                <CardTitle>Pastry Competition</CardTitle>
                <CardDescription>
                  Contestants showcase their baking skills with complex pastry creations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MasterChefTimeline competitions={pastryCompetitions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Master Chef Leaderboard</CardTitle>
                <CardDescription>See who&apos;s winning the most competitions in our Master Chef series</CardDescription>
              </CardHeader>
              <CardContent>
                <MasterChefLeaderboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Competition Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>About Master Chef</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Master Chef is our premier cooking competition that tests contestants&apos; culinary skills, creativity, and
                ability to perform under pressure.
              </p>
              <p className="text-muted-foreground mb-4">
                Throughout the competition, chefs face a variety of challenges including Mystery Box challenges,
                Pizza Showdowns, and Pastry Competitions. Each challenge is designed to push the contestants to their limits and
                showcase their culinary talents.
              </p>
              <p className="text-muted-foreground">
                Only the most skilled and adaptable chef will survive all the challenges to be crowned the Master Chef
                champion.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Challenge Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Mystery Box</h3>
                <p className="text-sm text-muted-foreground">
                  Contestants must create a dish using only the surprise ingredients revealed in their mystery box.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Pizza Showdown</h3>
                <p className="text-sm text-muted-foreground">
                  Contestants compete to create the most innovative and delicious pizzas with perfect technique and
                  presentation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Pastry Competition</h3>
                <p className="text-sm text-muted-foreground">
                  Contestants showcase their baking skills with complex pastry creations and desserts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

