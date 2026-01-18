'use client'

// Module imports
import { Box, Flex } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

// Local imports
import { DashboardNavigation } from '@/components/DashboardNavigation/DashboardNavigation'

// Types
type Props = Readonly<PropsWithChildren>

export function DashboardLayout(props: Props) {
	const { children } = props

	return (
		<Flex
			flexGrow={'1'}
			gap={'8'}
			height={'100%'}>
			<DashboardNavigation />

			<Box width={'100%'}>{children}</Box>
		</Flex>
	)
}
