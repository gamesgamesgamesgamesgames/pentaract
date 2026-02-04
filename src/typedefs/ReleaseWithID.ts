// Local imports
import { type Release } from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'
import { ReleaseDateWithID } from '@/typedefs/ReleaseDateWithID'

export type ReleaseWithID = Release & {
	id: string
	releaseDates?: ReleaseDateWithID[]
}
