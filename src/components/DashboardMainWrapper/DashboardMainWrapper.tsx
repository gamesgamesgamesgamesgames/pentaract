// Module imports
import { Box } from '@radix-ui/themes'
import { type PropsWithChildren } from 'react'

// Types
type Props = Readonly<PropsWithChildren>

export function DashboardMainWrapper(props: Props) {
	const { children } = props

	return <Box>{children}</Box>
}
