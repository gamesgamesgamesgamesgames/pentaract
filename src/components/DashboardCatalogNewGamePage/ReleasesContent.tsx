'use client'

// Local imports
import { Scroller } from '@/components/ui/scroller'
import { useDashboardCatalogNewGameContext } from '@/context/DashboardCatalogNewGameContext/DashboardCatalogNewGameContext'

export function ReleasesContent() {
	const { state } = useDashboardCatalogNewGameContext()

	const isDisabled = state === 'active'

	return (
		<Scroller className={'h-full'}>
			<div className={'flex flex-col'}>{'WIP'}</div>
		</Scroller>
	)
}
