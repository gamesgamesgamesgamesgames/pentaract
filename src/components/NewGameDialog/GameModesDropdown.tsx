// Module imports
import { Box, CheckboxCards, Flex, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useMemo } from 'react'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'
import { GAME_MODES } from '@/constants/GAME_MODES'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function GameModesDropdown(props: Props) {
	const { disabled } = props

	const options = useMemo(
		() =>
			GAME_MODES.map((mode) => (
				<CheckboxCards.Item
					key={mode.id}
					value={mode.id}>
					<Flex
						direction={'column'}
						width={'100%'}>
						<Text weight={'bold'}>{mode.name}</Text>
						<Text>{mode.description}</Text>
					</Flex>
				</CheckboxCards.Item>
			)),
		[],
	)

	return (
		<Form.Field
			asChild
			name={'modes'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Modes'}</FormLabel>
					<CheckboxCards.Root
						disabled={disabled}
						name={'modes'}>
						{options}
					</CheckboxCards.Root>
				</Box>
			</Flex>
		</Form.Field>
	)
}
