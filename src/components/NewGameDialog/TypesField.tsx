// Module imports
import { Box, Flex, Select } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useMemo, type ReactNode } from 'react'

// Local imports
import { FormLabel } from '@/components/FormLabel/FormLabel'
import { GAME_TYPES } from '@/constants/GAME_TYPES'
import { GAME_TYPES_CATEGORIES } from '@/constants/GAME_TYPES_CATEGORIES'

// Types
type Props = Readonly<{ disabled?: boolean }>

export function TypesField(props: Props) {
	const { disabled } = props

	const options = useMemo(
		() =>
			GAME_TYPES_CATEGORIES.reduce((accumulator, typeGroup, index, array) => {
				accumulator.push(
					<Select.Group key={typeGroup.label}>
						<Select.Label>{typeGroup.label}</Select.Label>
						{typeGroup.items.map((id) => (
							<Select.Item
								key={id}
								value={id}>
								{GAME_TYPES[id].name}
							</Select.Item>
						))}
					</Select.Group>,
				)

				if (index < array.length - 1) {
					accumulator.push(<Select.Separator key={index} />)
				}

				return accumulator
			}, [] as Array<ReactNode>),
		[],
	)

	return (
		<Form.Field
			asChild
			name={'type'}>
			<Flex
				asChild
				direction={'column'}>
				<Box mb={'5'}>
					<FormLabel>{'Type'}</FormLabel>
					<Form.Control asChild>
						<Select.Root
							defaultValue={'game'}
							disabled={disabled}>
							<Select.Trigger />
							<Select.Content>{options}</Select.Content>
						</Select.Root>
					</Form.Control>
				</Box>
			</Flex>
		</Form.Field>
	)
}
