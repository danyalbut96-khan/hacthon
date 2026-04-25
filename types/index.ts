export interface Medicine {
  id: string
  name: string
  genericName: string
  salt: string
  manufacturer: string
  estimatedPrice: number
  type: string
  strength: string
  uses?: string
  sideEffects?: string[]
}

export interface Substitute {
  id: string
  name: string
  salt: string
  manufacturer: string
  estimatedPrice: number
  strength: string
  type: string
  priceComparison: "cheaper" | "same" | "expensive"
  availability: "high" | "medium" | "low"
  rating: number
  note?: string
}
