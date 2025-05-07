export type Product = {
  id: string
  name: string
  price: number
  shortDescription: string
  description: string
  ingredients: string[]
  recipe: string[]
  imageUrl: string
  dateAdded: string
  type: "cocktail" | "tapas"
  count: number
}

export interface FreezerItem {
  id: string
  name: string
  type: "protein" | "vegetable" | "other" | "meal"
  dateAdded: Date
  quantity?: string
  consumed: boolean
}

