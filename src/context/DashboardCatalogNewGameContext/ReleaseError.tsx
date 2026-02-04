// Local imports
import { Button } from '@/components/ui/button'
import { useDashboardCatalogNewGameContext } from '@/context/DashboardCatalogNewGameContext/DashboardCatalogNewGameContext'
import { useCallback } from 'react'

export function ReleaseError() {
	const { goToStepIndex } = useDashboardCatalogNewGameContext()

	const handleClick = useCallback(() => {
		goToStepIndex(3) // Releases step is at index 3
	}, [goToStepIndex])

	return (
		<>
			{'At least one '}
			<Button
				className={'h-auto p-0'}
				onClick={handleClick}
				variant={'link'}>
				{'release'}
			</Button>
			{' with a complete release date is required.'}
		</>
	)
}
