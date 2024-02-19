import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import '../../index.css'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    children: 'Primary'
  }
}
export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
    size: 'sm'
  }
}
