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
    type: 'cocktail' | 'tapas'
  }
  
  