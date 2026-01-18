// Module imports
import {
	Box,
	Separator as RadixSeparator,
	type SeparatorProps,
} from '@radix-ui/themes'

type Props = SeparatorProps

export function Separator(props: Props) {
	return (
		<Box py={'4'}>
			<RadixSeparator
				size={'4'}
				{...props}
			/>
		</Box>
	)
}
