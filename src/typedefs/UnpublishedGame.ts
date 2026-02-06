// Local imports
import { type GameRecord } from '@/typedefs/GameRecord'
import { type MediaItem } from '@/typedefs/MediaItem'

// Types
export type UnpublishedGame = Partial<Omit<GameRecord, 'media'>> & {
	name: string
	media: MediaItem[]
}
