import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { formatDate, getBiasLabel, getBiasColor } from '@/lib/utils'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    description?: string
    url: string
    urlToImage?: string
    publishedAt: string
    source: string
    biasScore?: number
    summary?: string
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {article.title}
          </a>
        </CardTitle>
        <CardDescription>
          {article.source} • {formatDate(article.publishedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {article.summary || article.description}
        </p>
        {article.biasScore !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Bias:</span>
            <span className={`text-sm ${getBiasColor(article.biasScore)}`}>
              {getBiasLabel(article.biasScore)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
