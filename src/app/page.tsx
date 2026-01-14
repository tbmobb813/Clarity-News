'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArticleCard } from '@/components/ArticleCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

async function fetchArticles(query?: string, category?: string) {
  const params = new URLSearchParams()
  if (query) params.append('query', query)
  if (category) params.append('category', category)
  
  const response = await fetch(`/api/articles?${params}`)
  if (!response.ok) throw new Error('Failed to fetch articles')
  return response.json()
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentQuery, setCurrentQuery] = useState('')

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', currentQuery, selectedCategory],
    queryFn: () => fetchArticles(currentQuery, selectedCategory),
  })

  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

  const handleSearch = () => {
    setCurrentQuery(searchQuery)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Clarity News
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          AI-powered news aggregator with bias detection and summaries
        </p>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('')}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
      </div>

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
