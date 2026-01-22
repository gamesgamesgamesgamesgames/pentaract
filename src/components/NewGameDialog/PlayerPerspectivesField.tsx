// Module imports
import { Box, CheckboxCards, Flex, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useMemo } from 'react'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'
import { GAME_PLAYER_PERSPECTIVES } from '@/constants/GAME_PLAYER_PERSPECTIVES'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function PlayerPerspectivesField(props: Props) {
	const { disabled } = props

	const options = useMemo(
		() =>
			Object.entries(GAME_PLAYER_PERSPECTIVES).map(([id, mode]) => (
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
			name={'playerPerspectives'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Player Perspectives'}</FormLabel>
					<CheckboxCards.Root
						disabled={disabled}
						name={'playerPerspectives'}>
						{options}
					</CheckboxCards.Root>
				</Box>
			</Flex>
		</Form.Field>
	)
}
