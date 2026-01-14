'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { useUserStore } from '@/store/user'

export function Header() {
  const { user, clearUser } = useUserStore()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Clarity News
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/articles">
              <Button variant="ghost">Articles</Button>
            </Link>
            {user ? (
              <>
                <Link href="/saved">
                  <Button variant="ghost">Saved</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Button variant="outline" onClick={clearUser}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
