// Module imports
import { Box, CheckboxCards, Flex, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useMemo } from 'react'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'
import { GAME_GENRES } from '@/constants/GAME_GENRES'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function GenresField(props: Props) {
	const { disabled } = props

	const options = useMemo(
		() =>
			Object.entries(GAME_GENRES).map(([id, mode]) => (
				<CheckboxCards.Item
					key={id}
					value={id}>
					<Flex
						direction={'column'}
						width={'100%'}>
						<Text weight={'bold'}>{mode.name}</Text>
					</Flex>
				</CheckboxCards.Item>
			)),
		[],
	)

	return (
		<Form.Field
			asChild
			name={'genres'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Genres'}</FormLabel>
					<CheckboxCards.Root
						disabled={disabled}
						name={'genres'}>
						{options}
					</CheckboxCards.Root>
				</Box>
			</Flex>
		</Form.Field>
	)
}
