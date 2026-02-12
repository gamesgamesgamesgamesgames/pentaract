// Module imports
import { notFound } from 'next/navigation'

// Local imports
import * as API from '@/helpers/API'
import { About } from '@/components/GamePage/About'
import { Achievements } from '@/components/GamePage/Achievements'
import { type AtUriString } from '@atproto/lex'
import { Container } from '@/components/Container/Container'
import { Credits } from './Credits'
import { GameHeader } from '@/components/GamePage/GameHeader'
import { isDID } from '@/helpers/isDID'
import { RelatedContent } from '@/components/GamePage/RelatedContent'
import { ReleaseTimeline } from '@/components/GamePage/ReleaseTimeline'
import { Media } from './Media'

// Types
type Props = Readonly<PageProps<'/game/[did]/[rkey]'>>

export async function GamePage(props: Props) {
	const params = await props.params

	const didOrHandle = decodeURIComponent(params.did)
	const rkey = decodeURIComponent(params.rkey)

	let did
	if (isDID(didOrHandle)) {
		did = didOrHandle
	} else {
		did = await API.resolveHandle(didOrHandle)
		if (!did) {
			notFound()
		}
	}

	const gameURI: AtUriString = `at://${did}/games.gamesgamesgamesgames.game/${rkey}`

	const gameRecord = await API.getGame(gameURI)

	if (!gameRecord) {
		notFound()
	}

	return (
		<Container>
			<div className={'gap-4 grid grid-cols-3 max-w-full'}>
				<div className={'col-span-2 flex flex-col gap-4'}>
					<GameHeader gameRecord={gameRecord} />

					<Media gameRecord={gameRecord} />

					<Credits gameRecord={gameRecord} />

					<Achievements gameRecord={gameRecord} />
				</div>

				<div className={'flex flex-col gap-4'}>
					<About gameRecord={gameRecord} />

					<ReleaseTimeline gameRecord={gameRecord} />

					<RelatedContent gameRecord={gameRecord} />
				</div>
			</div>

			{/* <pre>{JSON.stringify({ params, gameRecord }, null, 2)}</pre> */}
		</Container>
	)
}
