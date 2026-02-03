// Local imports
import { type GameRecord } from '@/typedefs/GameRecord'
import { type MediaItem } from '@/typedefs/MediaItem'

// Types
export type UnpublishedGame = Partial<GameRecord> & {
	name: string
	media: MediaItem[]
}
