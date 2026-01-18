// Module imports
import { Box, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'

// Types
type Props = Form.FormLabelProps

export function FormLabel(props: Props) {
	const { children } = props
	return (
		<Form.Label
			asChild
			{...props}>
			<Box mb={'1'}>
				<Text weight={'bold'}>{children}</Text>
			</Box>
		</Form.Label>
	)
}
