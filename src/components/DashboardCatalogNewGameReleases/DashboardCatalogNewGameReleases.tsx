'use client'

// Local imports
import { useDashboardCatalogNewGameContext } from '@/context/DashboardCatalogNewGameContext/DashboardCatalogNewGameContext'

export function DashboardCatalogNewGameReleases() {
	const { state } = useDashboardCatalogNewGameContext()

	const isDisabled = state === 'active'

	return <div className={'flex flex-col'}>{'WIP'}</div>
}
