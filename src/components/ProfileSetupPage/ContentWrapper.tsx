// Module imports
import { useMemo } from 'react'

// Local imports
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'

export function ContentWrapper() {
	const { currentStepIndex, steps } = useProfileSetupContext()

	const contentElements = useMemo(
		() =>
			steps.map((step, index) => {
				if (currentStepIndex !== index) {
					return null
				}

				return <step.component key={JSON.stringify(step)} />
			}),
		[currentStepIndex, steps],
	)

	return contentElements
}
