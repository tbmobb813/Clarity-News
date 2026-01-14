'use client'

import { useQuery } from '@tanstack/react-query'
import { ArticleCard } from '@/components/ArticleCard'

async function fetchArticles() {
  const response = await fetch('/api/articles')
  if (!response.ok) throw new Error('Failed to fetch articles')
  return response.json()
}

export default function ArticlesPage() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['all-articles'],
    queryFn: fetchArticles,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Articles</h1>
      
      {isLoading ? (
        <div className="text-center py-12">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
