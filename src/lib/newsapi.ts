import axios from 'axios'

const NEWS_API_KEY = process.env.NEWS_API_KEY!
const NEWS_API_BASE_URL = 'https://newsapi.org/v2'

export interface NewsArticle {
  title: string
  description: string
  content: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    id: string | null
    name: string
  }
  author: string | null
}

export interface NewsAPIResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export async function fetchTopHeadlines(
  category?: string,
  country: string = 'us',
  pageSize: number = 20
): Promise<NewsAPIResponse> {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        apiKey: NEWS_API_KEY,
        country,
        category,
        pageSize,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching top headlines:', error)
    throw error
  }
}

export async function searchNews(
  query: string,
  pageSize: number = 20,
  sortBy: string = 'publishedAt'
): Promise<NewsAPIResponse> {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        apiKey: NEWS_API_KEY,
        q: query,
        pageSize,
        sortBy,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error searching news:', error)
    throw error
  }
}
