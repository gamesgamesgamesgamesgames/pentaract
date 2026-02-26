// Local imports
import * as API from '@/helpers/API'
import { type Game } from '@/typedefs/Game'

export async function getGame(uri: string): Promise<Game | undefined> {
	const record = await API.getGame(uri)

	if (!record) {
		return undefined
	}

	return { isHydrated: true, record }
}
