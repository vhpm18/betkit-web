import { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cx } from 'class-variance-authority'

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(inputs))
}
