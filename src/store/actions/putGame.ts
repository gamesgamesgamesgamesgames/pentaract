// Local imports
import { store } from '@/store/store'

type GameDetails = Record<string, unknown>

export async function putGame(gameDetails: GameDetails) {
	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot list games before logging in.')
	}

	const result = await quicksliceClient.mutate<{
		gamesGamesgamesgamesgamesGame: {
			edges: []
		}
	}>(
		`
		mutation PutGame ($name: String!, $summary: String, $type: String!, $modes: [String!]) {
			createGamesGamesgamesgamesgamesGame (
				input:  {
					name: $name
					summary: $summary
					type: $type
					modes: $modes
				}
			) {
				uri
			}
		}
	`,
		gameDetails,
	)
}
