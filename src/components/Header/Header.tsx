// Module imports
import { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// Types
type Props = Readonly<
	ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> & {
		level?: 1 | 2 | 3 | 4 | 5 | 6
	}
>

export function Header(props: Props) {
	const { children, className, level } = props

	const baseClassName = `scroll-m-20 text-4xl font-extrabold tracking-tight text-balance`

	switch (level) {
		case 6:
			return <h6 className={twMerge(baseClassName, className)}>{children}</h6>

		case 5:
			return <h5 className={twMerge(baseClassName, className)}>{children}</h5>

		case 4:
			return <h4 className={twMerge(baseClassName, className)}>{children}</h4>

		case 3:
			return <h3 className={twMerge(baseClassName, className)}>{children}</h3>

		case 2:
			return <h2 className={twMerge(baseClassName, className)}>{children}</h2>

		default:
			return <h1 className={twMerge(baseClassName, className)}>{children}</h1>
	}
}
