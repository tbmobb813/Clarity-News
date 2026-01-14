'use client'

import { useUserStore } from '@/store/user'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SavedPage() {
  const { user } = useUserStore()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your saved articles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/signin'}>
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Saved Articles</h1>
      
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          You haven&apos;t saved any articles yet.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Browse Articles
        </Button>
      </div>
    </div>
  )
}
