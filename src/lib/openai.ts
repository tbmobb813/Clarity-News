import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateSummary(content: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes news articles concisely.',
        },
        {
          role: 'user',
          content: `Please provide a brief 2-3 sentence summary of this article:\n\n${content}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.5,
    })

    return response.choices[0]?.message?.content || 'Summary not available'
  } catch (error) {
    console.error('Error generating summary:', error)
    return 'Summary not available'
  }
}

export async function analyzeBias(content: string): Promise<{ score: number; analysis: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing political and media bias in news articles. Provide a bias score from -1 (left-leaning) to 1 (right-leaning), with 0 being neutral. Also provide a brief analysis.',
        },
        {
          role: 'user',
          content: `Analyze the bias in this article and provide a score from -1 to 1 and a brief explanation:\n\n${content}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.3,
    })

    const result = response.choices[0]?.message?.content || ''
    
    // Parse the response to extract score and analysis
    const scoreMatch = result.match(/-?\d+\.?\d*/);
    const score = scoreMatch ? parseFloat(scoreMatch[0]) : 0;
    
    return {
      score: Math.max(-1, Math.min(1, score)), // Clamp between -1 and 1
      analysis: result,
    }
  } catch (error) {
    console.error('Error analyzing bias:', error)
    return {
      score: 0,
      analysis: 'Bias analysis not available',
    }
  }
}
