export type CompetitionStatus = "upcoming" | "ongoing" | "completed"

export type CompetitionType = "cupcake-wars" | "master-chef" | "pizza-showdown" | "pastry-competition" | "mystery-box"

export interface CompetitionEntry {
  participantId: string
  dishTitle: string
  description: string
  dishImage: string
  votes: number
  score?: number
  isChampion?: boolean
}

export interface CompetitionRule {
  title: string
  description: string
}

export interface Competition {
  id: string
  title: string
  date: string
  description: string
  status: CompetitionStatus
  isSpecial: boolean
  specialTheme?: string
  image?: string
  entries?: CompetitionEntry[]
  rules?: CompetitionRule[]
  ingredients?: string[]
  totalParticipants?: number
  type?: CompetitionType
  timeLimit?: number 
}

export const competitions: Competition[] = [
  {
    id: "first-fiesta",
    title: "First Fiesta",
    type: "cupcake-wars",
    date: "2025-04-06",
    description: "First ever cupcake war at F&M. No rules, no mercy, just cupcakes.",
    status: "ongoing",
    isSpecial: true,
    specialTheme: "First Edition",
    image: "/placeholder.svg?height=300&width=300",
    totalParticipants: 2,
    entries: [
      {
        participantId: "martina-roessler",
        dishTitle: "Berrylicious Bliss",
        description:
          "A luscious vanilla cupcake base, light and fluffy, crowned with a decadent swirl of cream cheese frosting blended with rich white chocolate and tangy cheesecake filling. Finished with a vibrant raspberry on top, this treat strikes the perfect balance between sweet and tart — a dreamy indulgence in every bite.",
        dishImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
        isChampion: false,
      },
      {
        participantId: "francisco-doberti",
        dishTitle: "Nuts for You",
        description:
          "A deep, cocoa-kissed cupcake with an irresistibly moist crumb, cloaked in a silky cream cheese frosting and drizzled with golden salted caramel. Crowned with a toasted hazelnut, this decadent creation smolders with sweet intensity and a hint of bold elegance — a bite of twilight temptation.",
        dishImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
      },
    ],
    rules: [
      {
        title: "Against the red",
        description: "No red velvet cupcakes allowed.",
      },
      {
        title: "In house cooking",
        description: "All cupcakes must be baked in the F&M kitchen.",
      },
      {
        title: "Presentation",
        description: "Cupcakes will be judged on appearance, creativity, and execution.",
      },
    ],
  },
  {
    id: "6-months-anniversary",
    title: "6 Months Anniversary",
    type: "cupcake-wars",
    date: "2025-06-23",
    description:
      "Celebrate the 6-month anniversary of F&M with a special cupcake war. Participants must create a cupcake that represents the spirit of F&M.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Anniversary Edition",
    image: "/placeholder.svg?height=300&width=300",
    totalParticipants: 2,
    entries: [
      {
        participantId: "martina-roessler",
        dishTitle: "TBD",
        description:
          "TBD",
        dishImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
        isChampion: false,
      },
      {
        participantId: "francisco-doberti",
        dishTitle: "TBD ",
        description:
          "TBD",
        dishImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
      },
    ],
    rules: [
      {
        title: "F&M Spirit",
        description: "Cupcakes must represent the spirit of F&M.",
      },
      {
        title: "Technique Showcase",
        description:
          "Participants should demonstrate at least one advanced chocolate technique (tempering, ganache, etc.).",
      },
      {
        title: "Presentation",
        description: "Cupcakes will be judged on appearance, creativity, and execution.",
      },
    ],
  },
  {
    id: "mystery-box-challenge-1",
    title: "Mystery Box Challenge: Seasonal Ingredients",
    date: "2025-05-19",
    description:
      "Contestants must create a gourmet dish using only the surprise ingredients revealed in their mystery box.",
    status: "upcoming",
    isSpecial: false,
    image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/masterchef-J5HKuckspbNEbaDZnrQsBp8toR2rRk.png",
    totalParticipants: 2,
    type: "mystery-box",
    ingredients: ["duck breast", "blackberries", "fennel", "star anise", "sweet potatoes", "dark chocolate"],
    entries: [
      {
        participantId: "martina-roesller",
        dishTitle: "Pan-Seared Duck with Blackberry Reduction",
        description:
          "Duck breast seared to perfection, served with a blackberry and star anise reduction, fennel puree, and sweet potato crisps.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 92,
        votes: 0,
      },
      {
        participantId: "francisco-doberti",
        dishTitle: "Duck Confit with Chocolate Sauce",
        description:
          "Slow-cooked duck confit with a rich dark chocolate and blackberry sauce, served with fennel and sweet potato hash.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 88,
        votes: 0,
      },
      {
        participantId: "alex-chen",
        dishTitle: "Spiced Duck and Berry Compote",
        description:
          "Five-spice duck breast with a blackberry compote, roasted fennel, and sweet potato mash with star anise infusion.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 85,
        votes: 0,
      },
    ],
    rules: [
      {
        title: "Mystery Box",
        description: "Contestants must use at least 4 of the 6 ingredients provided in the mystery box.",
      },
      {
        title: "Time Limit",
        description: "All dishes must be completed within the 60-minute time limit.",
      },
      {
        title: "Pantry Access",
        description: "Contestants have access to a basic pantry of staples (oils, spices, etc.).",
      },
      {
        title: "Judging Criteria",
        description: "Dishes will be judged on taste, presentation, creativity, and technical skill.",
      },
    ],
  },
  {
    id: "pizza-showdown-1",
    title: "Pizza Showdown: Best Pizza Wins",
    date: "2025-08-20",
    description:
      "Contestants must create the best pizza, showcasing their creativity and culinary skills. The most delicious and unique pizza wins.",
    status: "upcoming",
    isSpecial: true,
    image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/masterchef-J5HKuckspbNEbaDZnrQsBp8toR2rRk.png",
    totalParticipants: 2,
    type: "pizza-showdown",
    entries: [
      {
        participantId: "martina-roesller",
        dishTitle: "Martina's Margherita Deluxe",
        description:
          "Classic Margherita with a twist, topped with fresh basil, parmesan, and a light drizzle of olive oil.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 95,
        votes: 0,
      },
      {
        participantId: "francisco-doberti",
        dishTitle: "Francisco's Spicy Pepperoni Supreme",
        description:
          "A spicy, savory delight featuring pepperoni, black olives, mozzarella, and a secret spicy sauce.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 92,
        votes: 0,
      },
    ],
    rules: [
      {
        title: "No Set Ingredients",
        description: "Contestants are free to use any ingredients they desire to create their pizza.",
      },
      {
        title: "Best Pizza Wins",
        description: "The winner is determined by the overall taste, creativity, and execution of the pizza.",
      },
      {
        title: "No Time Limit",
        description: "Contestants are not restricted by a time limit; the focus is on creating the best pizza.",
      },
      {
        title: "Baking",
        description: "The pizza must be baked to perfection with a golden, crispy crust and delicious toppings.",
      },
    ],
  },
  {
    id: "pastry-competition-1",
    title: "Pastry Competition: Best Pastry Wins",
    date: "2025-10-12",
    description:
      "Contestants must create the most exquisite and flavorful pastry, showcasing their baking skills and creativity.",
    status: "upcoming",
    isSpecial: true,
    image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/masterchef-J5HKuckspbNEbaDZnrQsBp8toR2rRk.png",
    totalParticipants: 2,
    type: "pastry-competition",
    entries: [
      {
        participantId: "martina-roesller",
        dishTitle: "Martina's Classic Croissant",
        description:
          "Flaky, buttery croissant made with the finest ingredients, perfected through layers of dough and delicate folding.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 97,
        votes: 0,
      },
      {
        participantId: "francisco-doberti",
        dishTitle: "Francisco's Almond Puff Pastry",
        description:
          "A delicate puff pastry filled with a rich almond cream, topped with a light dusting of powdered sugar.",
        dishImage: "/placeholder.svg?height=400&width=400",
        score: 94,
        votes: 0,
      },
    ],
    rules: [
      {
        title: "No Set Ingredients",
        description: "Contestants have the freedom to choose their ingredients and create their signature pastry.",
      },
      {
        title: "Best Pastry Wins",
        description: "The winner is determined based on taste, texture, appearance, and creativity of the pastry.",
      },
      {
        title: "No Time Limit",
        description: "There is no time limit; the focus is on creating the best pastry with perfect execution.",
      },
      {
        title: "Baking",
        description: "The pastry must have the perfect balance of crispness, flakiness, and flavor.",
      },
    ],
  },
  
]

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((competition) => competition.id === id)
}

