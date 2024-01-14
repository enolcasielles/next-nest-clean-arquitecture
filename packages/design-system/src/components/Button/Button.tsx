import React from 'react'
import { Button as ShadcnButton } from '../ui/button'

interface Props {
  className: string
  children: React.ReactNode
}

export const Button = ({ className, children }: Props): React.ReactNode => {
  return (
    <ShadcnButton className={className}>{children}</ShadcnButton>
  )
}
