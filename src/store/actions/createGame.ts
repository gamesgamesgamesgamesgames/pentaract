// Module imports
import { type AtUriString } from '@atproto/lex'

// Local imports
import { type UnpublishedGame } from '@/typedefs/UnpublishedGame'

// Types
type Options = {
	shouldPublish?: boolean
}

export async function createGame(
	_gameDetails: UnpublishedGame,
	_options: Options = {},
): Promise<AtUriString> {
	console.warn('[pentaract] createGame is stubbed — HappyView data API not yet available')
	throw new Error('createGame is not available yet')
}
