// Local imports
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { type ComponentProps } from 'react'
import { type GameRecord } from '@/typedefs/GameRecord'
import { Skeleton } from '@radix-ui/themes'

// Types
type Props = Readonly<
	ComponentProps<'div'> & {
		gameRecord?: GameRecord
	}
>

export function BoxArt(props: Props) {
	const { className, gameRecord } = props

	const mediaItem = gameRecord?.media?.find(
		(item) => item.mediaType === 'cover',
	)

	return (
		<div className={className}>
			<Skeleton loading={!gameRecord}>
				<AspectRatio ratio={2 / 3}>
					<img
						alt={`Box art for ${gameRecord?.name}`}
						className={'relative h-full w-full object-cover'}
						src={mediaItem?.blob?.url ?? 'https://placehold.co/200x300'}
					/>
				</AspectRatio>
			</Skeleton>
		</div>
	)
}
