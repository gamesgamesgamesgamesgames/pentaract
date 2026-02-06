// Local imports
import { type MediaItem as MediaItemDef } from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'
import { type BCP47LanguageCode } from '@/typedefs/BCP47LanguageCode'
import { type Cid } from '@atproto/lex'
import { type MediaType } from '@/typedefs/MediaType'

export type MediaItem = MediaItemDef & {
	blob: null | {
		ref: Cid
		mimeType: string
		size: number
	}
	description: string
	height: null | number
	width: null | number
	file?: File
	locale: null | BCP47LanguageCode
	mediaType: null | MediaType
	title: string
}
