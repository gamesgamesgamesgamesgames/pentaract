// Module imports
import { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// Local imports
import { Scroller } from '@/components/ui/scroller'

// Types
type Props = Readonly<ComponentProps<'div'>>

export function Container(props: Props) {
	const { children, className } = props

	return (
		<Scroller
			className={twMerge(
				'flex flex-col grow items-center overflow-auto p-4',
				className,
			)}>
			<div className={'max-w-6xl size-full'}>{children}</div>
		</Scroller>
	)
}
