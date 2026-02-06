// Local imports
import { Card } from '@/components/ui/card'
import { type GameRecord } from '@/typedefs/GameRecord'
import { Header } from '@/components/Header/Header'
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item'

// Types
type Props = Readonly<{ gameRecord: GameRecord }>

// Constants
const ACHIEVEMENTS = Array(12).fill(null)

export function Achievements(props: Props) {
	const { gameRecord } = props

	return (
		<section>
			<Card className={'p-4'}>
				<Header level={3}>{'Achievements'}</Header>

				<div className={'gap-4 grid grid-cols-4'}>
					{ACHIEVEMENTS.map((_, index) => (
						<Item
							key={index}
							variant={'outline'}>
							<ItemMedia variant={'image'}>
								<img src={'https://placehold.co/100x100'} />
							</ItemMedia>

							<ItemContent>
								<ItemTitle>{'Achievement'}</ItemTitle>
								<ItemDescription className={'line-clamp-none'}>
									{'Achievement description.'}
								</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</div>
			</Card>
		</section>
	)
}
