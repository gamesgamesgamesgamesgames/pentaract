// Module imports
import { type QuicksliceClient, type User } from 'quickslice-client-js'
import { type Game } from './Game'

// Module imports
export type GlobalState = {
	gamesCatalog: null | Game[]
	gamesCatalogState: 'idle' | 'active' | 'error'
	quicksliceClient: null | QuicksliceClient
	user: null | User
}
