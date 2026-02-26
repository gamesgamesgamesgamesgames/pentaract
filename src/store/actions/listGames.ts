// Local imports
import * as API from '@/helpers/API'
import { type Game } from '@/typedefs/Game'
import { store } from '@/store/store'

export async function listGames() {
	const { gamesCatalogCursor } = store.state

	const data = await API.listGames(20, gamesCatalogCursor ?? undefined)

	const newGames: Game[] = data.games.map((record) => ({
		isHydrated: false,
		record,
	}))

	const { gamesCatalog: existingGames } = store.state

	store.set({
		gamesCatalog: existingGames ? [...existingGames, ...newGames] : newGames,
		gamesCatalogCursor: data.cursor ?? null,
		gamesCatalogHasNextPage: Boolean(data.cursor),
	})
}
