// Module imports
import { Box, Flex, TextArea } from '@radix-ui/themes'
import { Form } from 'radix-ui'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function SummaryField(props: Props) {
	const { disabled } = props

	return (
		<Form.Field
			asChild
			name={'summary'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Summary'}</FormLabel>
					<Form.Message match={'valueMissing'}>
						{'Summary is required'}
					</Form.Message>
					<Form.Control asChild>
						<TextArea
							disabled={disabled}
							required
						/>
					</Form.Control>
				</Box>
			</Flex>
		</Form.Field>
	)
}
