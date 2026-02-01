// Module imports
import { type ReactNode } from 'react'

export type StepperStep = {
	component: () => ReactNode
	title: string
	description?: string
}
