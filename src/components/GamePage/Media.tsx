// Module imports
import { Fragment } from 'react'

// Local imports
import { Card } from '@/components/ui/card'
import { type GameRecord } from '@/typedefs/GameRecord'
import { Header } from '@/components/Header/Header'
import { MediaType } from '@/typedefs/MediaType'

// Types
type GameMediaItem = NonNullable<GameRecord['media']>[number]
type Props = Readonly<{ gameRecord: GameRecord }>

export function Media(props: Props) {
	const { gameRecord } = props

	if (!gameRecord.media?.length) {
		return null
	}

	const mediaItemFilters = gameRecord?.media?.reduce(
		(accumulator, mediaItem) => {
			const mediaType = mediaItem.mediaType!
			if (!accumulator[mediaType]) {
				accumulator[mediaType] = []
			}

			accumulator[mediaType].push(mediaItem)

			return accumulator
		},
		{} as Record<MediaType, GameMediaItem[]>,
	)

	return (
		<section>
			<Card className={'flex p-4'}>
				<Header level={3}>{'Media'}</Header>

				{Object.entries(mediaItemFilters).map(([mediaType, mediaItems]) => (
					<Fragment key={mediaType}>
						<Header level={4}>{mediaType}</Header>
						<div className={'col-span-2 gap-4 grid grid-cols-3'}>
							{mediaItems.map((mediaItem) => (
								<img
									key={mediaItem.blob!.url}
									alt={`Screenshot from ${gameRecord?.name}`}
									className={'relative h-full w-full object-contain'}
									src={mediaItem.blob!.url ?? 'https://placehold.co/320x180'}
								/>
							))}
						</div>
					</Fragment>
				))}
			</Card>
		</section>
	)
}
