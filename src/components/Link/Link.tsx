// Module imports
import {
	Link as RadixLink,
	type LinkProps as RadixLinkProps,
} from '@radix-ui/themes'
import NextLink from 'next/link'
import { LinkProps as NextLinkProps } from 'next/link'

// Types
type Props = Readonly<
	RadixLinkProps & {
		href: NextLinkProps['href']
		nextProps?: NextLinkProps
	}
>

export function Link(props: Props) {
	const { children, nextProps } = props

	return (
		<RadixLink
			asChild
			{...props}>
			<NextLink
				{...nextProps}
				href={props.href}>
				{children}
			</NextLink>
		</RadixLink>
	)
}
