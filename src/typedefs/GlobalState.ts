// Module imports
import { type QuicksliceClient } from 'quickslice-client-js'
import { type Game } from '@/typedefs/Game'

// Local imports
import { User } from '@/typedefs/User'

export type GlobalState = {
	gamesCatalog: null | Game[]
	gamesCatalogCursor: null | string
	gamesCatalogHasNextPage: boolean
	quicksliceClient: null | QuicksliceClient
	user: null | User
}
