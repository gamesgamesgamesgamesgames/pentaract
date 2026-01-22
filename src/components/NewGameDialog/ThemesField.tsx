// Module imports
import { Box, CheckboxCards, Flex, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useMemo } from 'react'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'
import { GAME_THEMES } from '@/constants/GAME_THEMES'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function ThemesField(props: Props) {
	const { disabled } = props

	const options = useMemo(
		() =>
			Object.entries(GAME_THEMES).map(([id, mode]) => (
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
			name={'themes'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Themes'}</FormLabel>
					<CheckboxCards.Root
						disabled={disabled}
						name={'themes'}>
						{options}
					</CheckboxCards.Root>
				</Box>
			</Flex>
		</Form.Field>
	)
}
