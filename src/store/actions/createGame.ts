// Module imports
import { type AtUriString } from '@atproto/lex'

// Local imports
import * as API from '@/helpers/API'
import { type UnpublishedGame } from '@/typedefs/UnpublishedGame'

// Types
type Options = {
	shouldPublish?: boolean
}

export function createGame(
	gameDetails: UnpublishedGame,
	options: Options = {},
): Promise<AtUriString> {
	return API.createGame(gameDetails, options)
}
