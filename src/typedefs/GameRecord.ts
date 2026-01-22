// Module imports
import { type AtUriString } from '@atproto/lex'

// Local imports
import type * as GameLexicon from '@/helpers/lexicons/games/gamesgamesgamesgames/game'

export type GameRecord = GameLexicon.Main & {
	uri: AtUriString
	name: string
}
