import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function getBiasLabel(score: number): string {
  if (score < -0.5) return 'Left-leaning'
  if (score < -0.2) return 'Slightly left-leaning'
  if (score < 0.2) return 'Neutral'
  if (score < 0.5) return 'Slightly right-leaning'
  return 'Right-leaning'
}

export function getBiasColor(score: number): string {
  if (score < -0.5) return 'text-blue-600'
  if (score < -0.2) return 'text-blue-400'
  if (score < 0.2) return 'text-gray-600'
  if (score < 0.5) return 'text-red-400'
  return 'text-red-600'
}
