import { NextRequest, NextResponse } from 'next/server'
import { fetchTopHeadlines, searchNews } from '@/lib/newsapi'
import { redis } from '@/lib/redis'
import { prisma } from '@/lib/prisma'
import { generateSummary, analyzeBias } from '@/lib/openai'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const cacheKey = query ? `news:search:${query}` : `news:headlines:${category || 'general'}`

    // Check cache
    const cached = await redis.get(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from NewsAPI
    const newsData = query
      ? await searchNews(query)
      : await fetchTopHeadlines(category || undefined)

    // Process articles in batches to avoid rate limiting
    const batchSize = 3
    const processedArticles = []
    
    for (let i = 0; i < Math.min(newsData.articles.length, 10); i += batchSize) {
      const batch = newsData.articles.slice(i, i + batchSize)
      const batchResults = await Promise.all(
        batch.map(async (article) => {
          try {
            // Check if article exists
            let dbArticle = await prisma.article.findUnique({
              where: { url: article.url },
            })

            if (!dbArticle) {
              // Generate AI summary and bias analysis
              const content = article.content || article.description || article.title
              const [summary, biasAnalysis] = await Promise.all([
                generateSummary(content),
                analyzeBias(content),
              ])

              // Save to database
              dbArticle = await prisma.article.create({
                data: {
                  title: article.title,
                  description: article.description,
                  content: article.content,
                  url: article.url,
                  urlToImage: article.urlToImage,
                  publishedAt: new Date(article.publishedAt),
                  source: article.source.name,
                  author: article.author,
                  summary,
                  biasScore: biasAnalysis.score,
                  biasAnalysis: biasAnalysis.analysis,
                },
              })
            }

            return dbArticle
          } catch (error) {
            console.error('Error processing article:', error)
            return null
          }
        })
      )
      processedArticles.push(...batchResults)
    }

    const filteredArticles = processedArticles.filter((a) => a !== null)

    // Cache for 15 minutes
    await redis.set(cacheKey, filteredArticles, { ex: 900 })

    return NextResponse.json(filteredArticles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
