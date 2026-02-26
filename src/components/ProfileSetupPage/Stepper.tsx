// Module imports
import {
	faCheckCircle,
	faCircle,
	faDotCircle,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'

// Local imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Item,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item'
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'

export function Stepper() {
	const { currentStepIndex, goToStepIndex, steps } = useProfileSetupContext()

	const stepElements = useMemo(() => {
		return steps.map((step, index) => (
			<Button
				key={index}
				asChild
				className={'cursor-default flex-nowrap'}
				onClick={() => goToStepIndex(index)}
				variant={'ghost'}>
				<Item
					size={'sm'}
					variant={'default'}>
					<ItemMedia variant={'icon'}>
						{index > currentStepIndex && (
							<FontAwesomeIcon
								className={'text-muted-foreground'}
								icon={faCircle}
							/>
						)}

						{index === currentStepIndex && (
							<FontAwesomeIcon icon={faDotCircle} />
						)}

						{index < currentStepIndex && (
							<FontAwesomeIcon icon={faCheckCircle} />
						)}
					</ItemMedia>

					<ItemContent>
						<ItemTitle>{step.title}</ItemTitle>
					</ItemContent>
				</Item>
			</Button>
		))
	}, [currentStepIndex, goToStepIndex, steps])

	return (
		<Card className={'h-min p-4 w-min'}>
			<div className={'flex flex-col'}>{stepElements}</div>
		</Card>
	)
}
