// Module imports
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { type ReactNode, useCallback, useState } from 'react'

// Local imports
import { GenresField } from '@/components/NewGameDialog/GameGenresField'
import { ModesField } from '@/components/NewGameDialog/GameModesField'
import { PlayerPerspectivesField } from '@/components/NewGameDialog/GamePlayerPerspectivesField'
import { ThemesField } from '@/components/NewGameDialog/GameThemesField'
import { TypesField } from '@/components/NewGameDialog/GameTypesField'
import { NameField } from '@/components/NewGameDialog/NameField'
import { putGame } from '@/store/actions/putGame'
import { type State } from '@/typedefs/State'
import { SummaryField } from '@/components/NewGameDialog/SummaryField'

// Types
type Props = Readonly<{ trigger: ReactNode }>

export function NewGameDialog(props: Props) {
	const { trigger } = props

	const [isOpen, setIsOpen] = useState(false)
	const [state, setState] = useState<State>('idle')

	const handleSubmit = useCallback((formData: FormData) => {
		setState('active')
		const result: Record<string, unknown> = Object.fromEntries(formData)
		result.modes = formData.getAll('modes')
		putGame(result).then(() => {
			setIsOpen(false)
			setState('idle')
		})
	}, [])

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={setIsOpen}>
			<Dialog.Trigger>{trigger}</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>{'New Game'}</Dialog.Title>
				<Dialog.Description mb={'4'}>{'Create a new game.'}</Dialog.Description>

				<Form.Root
					action={handleSubmit}
					asChild>
					<form>
						<Flex direction={'column'}>
							<NameField disabled={state === 'active'} />

							<SummaryField disabled={state === 'active'} />

							<TypesField disabled={state === 'active'} />

							{/* parent */}

							<ModesField disabled={state === 'active'} />

							<GenresField disabled={state === 'active'} />

							<ThemesField disabled={state === 'active'} />

							<PlayerPerspectivesField disabled={state === 'active'} />

							{/* releaseDates */}
						</Flex>

						<Flex
							gap={'3'}
							justify={'end'}
							mt={'4'}>
							<Dialog.Close>
								<Button disabled={state === 'active'}>{'Cancel'}</Button>
							</Dialog.Close>

							<Form.Submit asChild>
								<Button loading={state === 'active'}>{'Save'}</Button>
							</Form.Submit>
						</Flex>
					</form>
				</Form.Root>
			</Dialog.Content>
		</Dialog.Root>
	)
}
