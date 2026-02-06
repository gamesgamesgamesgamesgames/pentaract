// Local imports
import { Card } from '@/components/ui/card'
import { type GameRecord } from '@/typedefs/GameRecord'
import { Header } from '@/components/Header/Header'
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item'

// Types
type Props = Readonly<{ gameRecord: GameRecord }>

// Constants
const CREDITS = Array(10).fill(null)

export function Credits(props: Props) {
	const { gameRecord } = props

	return (
		<section>
			<Card className={'p-4'}>
				<Header level={3}>{'Credits'}</Header>

				<div className={'flex flex-wrap gap-4'}>
					{CREDITS.map((_, index) => (
						<Item
							key={index}
							className={'items-center shrink-1 w-[100px]'}
							variant={'outline'}>
							<ItemHeader>
								<img
									className={'rounded-md'}
									src={'https://placehold.co/100x100'}
								/>
							</ItemHeader>

							<ItemContent>
								<ItemTitle>{'Person Name'}</ItemTitle>
								<ItemDescription className={'line-clamp-none'}>
									{'Role/Title'}
								</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</div>
			</Card>
		</section>
	)
}
