// Module imports
import {
	faBusinessTime,
	faCalendar,
	faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Local imports
import * as API from '@/helpers/API'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { type AtUriString } from '@atproto/lex'
import { Badge } from '@/components/ui/badge'
import { BoxArt } from '@/components/BoxArt/BoxArt'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/Container/Container'
import { type DID } from '@/typedefs/DID'
import { GAME_GENRES } from '@/constants/GAME_GENRES'
import { Header } from '@/components/Header/Header'
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GamePageCredits } from '@/components/GamePage/GamePageCredits'
import { GamePageMedia } from '@/components/GamePage/GamePageMedia'
import { GamePageReleases } from '@/components/GamePage/GamePageReleases'
import { GamePageRelated } from '@/components/GamePage/GamePageRelated'
import { GamePageOverview } from '@/components/GamePage/GamePageOverview'

// Types
type Props = Readonly<PageProps<'/game/[did]/[rkey]'>>

// Constants
const ACHIEVEMENTS = Array(20).fill(null)

export async function GamePage(props: Props) {
	const params = await props.params

	const did = decodeURIComponent(params.did) as DID
	const rkey = decodeURIComponent(params.rkey)
	const gameURI: AtUriString = `at://${did}/games.gamesgamesgamesgames.game/${rkey}`

	const gameRecord = await API.getGame(gameURI)

	return (
		<Container>
			<div className={'flex flex-col gap-4'}>
				<section>
					<Card className={'p-4'}>
						<div className={'flex gap-4'}>
							<BoxArt
								className={'w-[140px]'}
								gameRecord={gameRecord}
							/>
							<div className={'flex flex-col'}>
								<Header>{gameRecord.name}</Header>

								<div className={'flex flex-wrap gap-2'}>
									<Badge variant={'outline'}>
										<FontAwesomeIcon icon={faBusinessTime} />
										{'Developer Studio, LLC'}
									</Badge>

									<Badge variant={'outline'}>
										<FontAwesomeIcon icon={faCalendar} />
										{'2017'}
									</Badge>

									<Badge variant={'outline'}>
										<FontAwesomeIcon icon={faStarHalfAlt} />
										{'9.3'}
									</Badge>
								</div>

								<div className={'flex flex-wrap gap-2'}>
									<Badge variant={'outline'}>{'Nintendo Switch'}</Badge>
								</div>

								<div className={'flex flex-wrap gap-2'}>
									{Boolean(gameRecord.genres) &&
										gameRecord.genres!.map((genre) => (
											<Badge
												key={genre}
												variant={'outline'}>
												{GAME_GENRES[genre].name}
											</Badge>
										))}
								</div>
							</div>
						</div>
					</Card>
				</section>

				<section>
					<Card className={'gap-10 grid grid-cols-3 p-4'}>
						<div>
							<Header level={3}>{'About'}</Header>
							<p>{gameRecord.summary}</p>
						</div>

						<div className={'col-span-2'}>
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
						</div>
					</Card>
				</section>

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

				<section>
					<Card className={'p-4'}>
						<Tabs defaultValue={'overview'}>
							<TabsList>
								<TabsTrigger value={'overview'}>{'Overview'}</TabsTrigger>
								<TabsTrigger value={'media'}>{'Media'}</TabsTrigger>
								<TabsTrigger value={'releases'}>{'Releases'}</TabsTrigger>
								<TabsTrigger value={'credits'}>{'Credits'}</TabsTrigger>
								<TabsTrigger value={'related'}>{'Related Content'}</TabsTrigger>
							</TabsList>

							<GamePageOverview gameRecord={gameRecord} />

							<GamePageMedia />

							<GamePageReleases />

							<GamePageCredits
								developers={[
									{
										name: 'Nintendo EPD Production Group No. 7',
										id: 'nintendo-epd-production-group-no-7',
									},
								]}
								publishers={[
									{
										name: 'Nintendo',
										id: 'nintendo',
									},
								]}
							/>

							<GamePageRelated />
						</Tabs>
					</Card>
				</section>
			</div>

			<pre>{JSON.stringify({ params, gameRecord }, null, 2)}</pre>
		</Container>
	)
}
