// Module imports
import { Box, Flex, TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function NameField(props: Props) {
	const { disabled } = props

	return (
		<Form.Field
			asChild
			name={'name'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Name'}</FormLabel>
					<Form.Message match={'valueMissing'}>
						{'Name is required'}
					</Form.Message>
					<Form.Control asChild>
						<TextField.Root
							autoComplete={'off'}
							disabled={disabled}
							required
						/>
					</Form.Control>
				</Box>
			</Flex>
		</Form.Field>
	)
}
