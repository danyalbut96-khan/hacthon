export interface Medicine {
  id: string
  name: string
  genericName: string
  salt: string
  manufacturer: string
  price: number
  type: "tablet" | "syrup" | "injection" | "cream"
  strength: string
}

export interface Substitute {
  id: string
  name: string
  salt: string
  manufacturer: string
  price: number
  priceComparison: "cheaper" | "same" | "expensive"
  availability: "high" | "medium" | "low"
  rating: number
}
