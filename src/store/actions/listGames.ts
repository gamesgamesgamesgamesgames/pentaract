// Local imports
import { type Game } from '@/typedefs/Game'
import { store } from '@/store/store'

export async function listGames() {
	store.set(() => ({ gamesCatalogState: 'active' }))

	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot list games before logging in.')
	}

	const result = await quicksliceClient.query<{
		gamesGamesgamesgamesgamesGame: {
			edges: {
				node: Game
			}[]
		}
	}>(`
		query {
			gamesGamesgamesgamesgamesGame(
				first: 20
			) {
				edges {
					node {
						uri
						did
						name
						summary
						type
						modes
					}
				}
			}
		}
	`)

	store.set(() => ({
		gamesCatalog: result.gamesGamesgamesgamesgamesGame.edges.map(
			(edge) => edge.node,
		),
		gamesCatalogState: 'idle',
	}))
}
