import { create } from 'zustand'

interface Article {
  id: string
  title: string
  description?: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: string
  biasScore?: number
}

interface ArticleState {
  articles: Article[]
  selectedArticle: Article | null
  setArticles: (articles: Article[]) => void
  setSelectedArticle: (article: Article | null) => void
  addArticles: (articles: Article[]) => void
}

export const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  selectedArticle: null,
  setArticles: (articles) => set({ articles }),
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  addArticles: (articles) =>
    set((state) => ({
      articles: [...state.articles, ...articles],
    })),
}))
