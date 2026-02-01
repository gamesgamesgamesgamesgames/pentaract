// Module imports
import { useMemo } from 'react'

// Local imports
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDashboardCatalogNewGameContext } from '@/context/DashboardCatalogNewGameContext/DashboardCatalogNewGameContext'

export function DashboardCatalogNewGamePageContent() {
	const { currentStepIndex, steps } = useDashboardCatalogNewGameContext()

	const contentElements = useMemo(
		() =>
			steps.map((step, index) => {
				if (currentStepIndex !== index) {
					return null
				}

				return <step.component key={JSON.stringify(step)} />
			}),
		[currentStepIndex],
	)
	return <ScrollArea className={'flex-grow'}>{contentElements}</ScrollArea>
}
