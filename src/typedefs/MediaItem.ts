// Local imports
import { type BCP47LanguageCode } from '@/typedefs/BCP47LanguageCode'
import { type Cid } from '@atproto/lex'
import { type MediaType } from '@/typedefs/MediaType'

export type MediaItem = {
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
