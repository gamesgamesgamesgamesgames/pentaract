// Local imports
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { type GameRecord } from '@/typedefs/GameRecord'
import { Header } from '@/components/Header/Header'

// Types
type Props = Readonly<{ gameRecord: GameRecord }>

export function Media(props: Props) {
	const { gameRecord } = props

	return (
		<section>
			<Card className={'flex p-4'}>
				<Header level={3}>{'Screenshots'}</Header>

				<div className={'col-span-2 gap-4 grid grid-cols-3'}>
					<AspectRatio ratio={16 / 9}>
						<img
							alt={`Screenshot from ${gameRecord?.name}`}
							className={'relative h-full w-full object-cover'}
							src={'https://placehold.co/320x180'}
						/>
					</AspectRatio>
					<AspectRatio ratio={16 / 9}>
						<img
							alt={`Screenshot from ${gameRecord?.name}`}
							className={'relative h-full w-full object-cover'}
							src={'https://placehold.co/320x180'}
						/>
					</AspectRatio>
					<AspectRatio ratio={16 / 9}>
						<img
							alt={`Screenshot from ${gameRecord?.name}`}
							className={'relative h-full w-full object-cover'}
							src={'https://placehold.co/320x180'}
						/>
					</AspectRatio>
					<AspectRatio ratio={16 / 9}>
						<img
							alt={`Screenshot from ${gameRecord?.name}`}
							className={'relative h-full w-full object-cover'}
							src={'https://placehold.co/320x180'}
						/>
					</AspectRatio>
					<AspectRatio ratio={16 / 9}>
						<img
							alt={`Screenshot from ${gameRecord?.name}`}
							className={'relative h-full w-full object-cover'}
							src={'https://placehold.co/320x180'}
						/>
					</AspectRatio>
					<AspectRatio ratio={16 / 9}>
						<img
							alt={`Screenshot from ${gameRecord?.name}`}
							className={'relative h-full w-full object-cover'}
							src={'https://placehold.co/320x180'}
						/>
					</AspectRatio>
				</div>
			</Card>
		</section>
	)
}
