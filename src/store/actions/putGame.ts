// Module imports
import { type AtUriString } from '@atproto/lex'

// Local imports
import { type UnpublishedGame } from '@/typedefs/UnpublishedGame'

// Types
type Options = { shouldPublish?: boolean }

export async function putGame(
	_uri: AtUriString,
	_gameDetails: UnpublishedGame,
	_options: Options = {},
): Promise<AtUriString> {
	console.warn('[pentaract] putGame is stubbed — HappyView data API not yet available')
	throw new Error('putGame is not available yet')
}
