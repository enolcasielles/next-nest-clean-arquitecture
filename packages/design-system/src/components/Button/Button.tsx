import React from 'react'
import { Button as ShadcnButton } from '../ui/button'

export const buttonVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const

export type ButtonVariant = typeof buttonVariants[number]
interface Props {
  variant: ButtonVariant
  className: string
  children: React.ReactNode
}

export const Button = ({ variant, className, children }: Props): React.ReactNode => {
  console.log('Button!!!')
  return (
    <ShadcnButton variant={variant} className={className}>{children}</ShadcnButton>
  )
}
