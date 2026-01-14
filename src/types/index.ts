export interface Article {
  id: string
  title: string
  description?: string
  content?: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: string
  author?: string
  category?: string
  summary?: string
  biasScore?: number
  biasAnalysis?: string
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
}

export interface Subscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripePriceId: string
  stripeCurrentPeriodEnd: Date
  status: string
}

export interface UserPreference {
  id: string
  userId: string
  topics: string[]
  sources: string[]
  language: string
}
