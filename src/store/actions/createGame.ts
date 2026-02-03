// Module imports
import { type AtUriString } from '@atproto/lex'

// Local imports
import { store } from '@/store/store'
import { UnpublishedGame } from '@/typedefs/UnpublishedGame'

// Types
type Options = {
	shouldPublish?: boolean
}

export async function createGame(
	gameDetails: UnpublishedGame,
	options: Options = {},
) {
	const { shouldPublish } = options

	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot list games before logging in.')
	}

	const timestamp = new Date().toISOString()

	const input: UnpublishedGame & {
		createdAt?: string
		publishedAt?: string
	} = {
		...gameDetails,
		createdAt: timestamp,
		media: gameDetails.media.map((mediaItem) => {
			const newMediaItem = { ...mediaItem }
			delete newMediaItem.file
			return newMediaItem
		}),
	}

	if (shouldPublish) {
		input.publishedAt = timestamp
	}

	const result = await quicksliceClient.mutate<{
		createGamesGamesgamesgamesgamesGame: {
			uri: AtUriString
		}
	}>(
		`
		mutation CreateGame ($input: GamesGamesgamesgamesgamesGameInput!) {
			createGamesGamesgamesgamesgamesGame (input: $input) {
				uri
			}
		}
		`,
		{ input },
	)

	return result.createGamesGamesgamesgamesgamesGame.uri
}
