// Module imports
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'

// Local imports
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'

export function Footer() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		accountType,
		currentStepIndex,
		hasNext,
		hasPrevious,
		nextStep,
		previousStep,
		state,
		steps,
		submitProfile,
	} = useProfileSetupContext()

	const isDisabled = state === 'active'

	const handleNextClick = useCallback(() => nextStep(), [nextStep])
	const handlePreviousClick = useCallback(() => previousStep(), [previousStep])

	const handleSubmitClick = useCallback(() => {
		if (!isSubmitting) {
			setIsSubmitting(true)
			submitProfile()
		}
	}, [isSubmitting, submitProfile])

	return (
		<div className={'items-center gap-4 grid grid-cols-3 mt-4'}>
			<div className={'items-center flex gap-4'}>
				{hasPrevious && (
					<Button
						disabled={isDisabled}
						onClick={handlePreviousClick}
						variant={'outline'}>
						{'Back'}
					</Button>
				)}
			</div>

			<div className={'flex justify-center text-muted-foreground text-sm'}>
				<span>{`Step ${currentStepIndex + 1} of ${steps.length}`}</span>
			</div>

			<div className={'items-center flex gap-4 justify-end'}>
				{hasNext && currentStepIndex === 0 && accountType && (
					<Button
						disabled={isDisabled}
						onClick={handleNextClick}>
						{'Next'}
					</Button>
				)}

				{hasNext && currentStepIndex > 0 && (
					<Button
						disabled={isDisabled}
						onClick={handleNextClick}>
						{'Next'}
					</Button>
				)}

				{!hasNext && currentStepIndex > 0 && (
					<Button
						color={'green'}
						disabled={isDisabled}
						onClick={handleSubmitClick}>
						{isSubmitting && <Spinner data-icon={'inline-start'} />}
						{!isSubmitting && <FontAwesomeIcon icon={faCheck} />}
						{'Create Profile'}
					</Button>
				)}
			</div>
		</div>
	)
}
