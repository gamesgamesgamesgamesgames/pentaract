'use client'

// Local imports
import { Container } from '@/components/Container/Container'
import { DashboardCatalogNewGameContextProvider } from '@/context/DashboardCatalogNewGameContext/DashboardCatalogNewGameContext'
import { ContentWrapper } from '@/components/DashboardCatalogNewGamePage/ContentWrapper'
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader'
import { Footer } from '@/components/DashboardCatalogNewGamePage/Footer'
import { Stepper } from '@/components/DashboardCatalogNewGamePage/Stepper'

// Constants
const BREADCRUMBS = [
	{
		label: 'My Catalog',
		url: '/dashboard/catalog',
	},
	{
		label: 'New Game',
		url: '/dashboard/catalog/new-game/general',
	},
]

export function DashboardCatalogNewGamePage() {
	return (
		<DashboardCatalogNewGameContextProvider>
			<DashboardHeader breadcrumbs={BREADCRUMBS} />

			<Container isScrollable={false}>
				<div className={'items-stretch flex gap-4 h-full overflow-hidden'}>
					<Stepper />

					<div className={'flex flex-col grow justify-stretch w-full'}>
						<ContentWrapper />

						<Footer />
					</div>
				</div>
			</Container>
		</DashboardCatalogNewGameContextProvider>
	)
}
