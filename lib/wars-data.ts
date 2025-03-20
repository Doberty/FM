export type CompetitionStatus = "upcoming" | "ongoing" | "completed"

export interface CupcakeCompetition {
  id: string
  title: string
  date: string
  description: string
  status: CompetitionStatus
  isSpecial: boolean
  specialTheme?: string
  image?: string
  participants?: number
}

export const cupcakeCompetitions: CupcakeCompetition[] = [
  {
    id: "first-edition",
    title: "First Fiesta",
    date: "2025-03-020",
    description: "First ever cupcakewar, no rules no mercy and no quarter.",
    status: "ongoing",
    isSpecial: false,
    image: "/placeholder.svg?height=300&width=300",
    participants: 2,
  },
  {
    id: "Pascua-2025",
    title: "Pascua",
    date: "2025-04-19",
    description: "Celebrate Easter with our special Easter-themed cupcakes.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Easter",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "halloween-spooktacular-2025",
    title: "Halloween Spooktacular",
    date: "2025-10-31",
    description: "Create the spookiest and most creative cupcakes for our Halloween competition.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Halloween",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "christmas-sweet-2024",
    title: "Christmas Sweet",
    date: "2025-12-20",
    description: "Christmas special with festive cupcakes, traditional flavors, and holiday decorations.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Christmas",
    image: "/placeholder.svg?height=300&width=300",
  },
]

