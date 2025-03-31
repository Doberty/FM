"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import {
  Wine,
  Music,
  Dumbbell,
  CalendarIcon,
  CalendarPlus2Icon as CalendarIcon2,
  PlusCircle,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import React from "react"

// Define the type for our statistics data
interface StatisticsData {
  totalCocktailsMade: number
  totalDiscoNights: number
  totalGym: number
  totalDates: number
  error?: string
}

// Define the schema for our activity form
const activityFormSchema = z.object({
  type: z.enum(["disco", "gym", "date"], {
    required_error: "Please select an activity type",
  }),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().min(1, "Description is required"),
  date_added: z.date({
    required_error: "Please select a date",
  }),
})

type ActivityFormValues = z.infer<typeof activityFormSchema>

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatisticsData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Initialize form
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      type: undefined,
      venue: "",
      description: "",
      date_added: new Date(),
    },
  })

  // Fetch statistics data
  const fetchStatistics = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/activities/count")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch statistics:", error)
      setError("Failed to load statistics. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchStatistics()
  }, [])

  // Handle form submission
  async function onSubmit(data: ActivityFormValues) {
    setIsSubmitting(true)

    try {
      // Format the date to match expected format
      const formattedData = {
        ...data,
        date_added: data.date_added.toISOString(),
      }

      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add activity")
      }

      // Show success message
      toast.success("Activity added successfully", {
        description: `Added ${data.type} at ${data.venue}`,
      })

      // Close dialog and reset form
      setIsDialogOpen(false)
      form.reset()

      // Refresh statistics to show updated counts
      fetchStatistics()
    } catch (error) {
      console.error("Error adding activity:", error)
      toast.error("Failed to add activity", {
        description: error instanceof Error ? error.message : "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header showBackButton={true} title="STATISTICS" />

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Activity Statistics</h1>
              <p className="text-muted-foreground">Track your activities and progress</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Log Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Log New Activity</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="disco">Disco Night</SelectItem>
                              <SelectItem value="gym">Gym Session</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter venue name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter a brief description" className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date_added"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Activity"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cocktails Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Wine className="h-5 w-5 text-primary" />
                    Cocktails Made
                  </CardTitle>
                  <CardDescription>Total drinks crafted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <Skeleton className="h-10 w-16" />
                    ) : (
                      <span className="text-4xl font-bold">{stats?.totalCocktailsMade || 0}</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Disco Nights Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-primary" />
                    Disco Nights
                  </CardTitle>
                  <CardDescription>Dance adventures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <Skeleton className="h-10 w-16" />
                    ) : (
                      <span className="text-4xl font-bold">{stats?.totalDiscoNights || 0}</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Gym Sessions Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    Gym Sessions
                  </CardTitle>
                  <CardDescription>Workout dedication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <Skeleton className="h-10 w-16" />
                    ) : (
                      <span className="text-4xl font-bold">{stats?.totalGym || 0}</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Dates Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon2 className="h-5 w-5 text-primary" />
                    Dates
                  </CardTitle>
                  <CardDescription>Romantic outings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <Skeleton className="h-10 w-16" />
                    ) : (
                      <span className="text-4xl font-bold">{stats?.totalDates || 0}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

