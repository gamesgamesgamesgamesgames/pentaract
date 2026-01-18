'use client'

// Module imports
import { Container, Flex, Grid } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

// Local imports
import { ApplicationNavigation } from '@/components/ApplicationNavigation/ApplicationNavigation'
import { DashboardNavigation } from '@/components/DashboardNavigation/DashboardNavigation'

// Types
type Props = Readonly<PropsWithChildren>

export function RootLayout(props: Props) {
	const { children } = props

	return (
		<Container p={'6'}>
			<Flex
				align={'stretch'}
				direction={'column'}
				gap={'4'}>
				<ApplicationNavigation />
				{children}
			</Flex>
		</Container>
	)
}
