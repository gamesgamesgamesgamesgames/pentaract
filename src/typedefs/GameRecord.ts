// Module imports
import { type AtUriString, type BlobRef } from '@atproto/lex'

// Local imports
import type * as GameLexicon from '@/helpers/lexicons/games/gamesgamesgamesgames/game'

export type GameRecord = Omit<GameLexicon.Main, 'media'> & {
	media?: (Omit<GameLexicon.MediaItem, 'blob'> & {
		blob?: BlobRef & { url: string }
	})[]
	name: string
	uri: AtUriString
}
