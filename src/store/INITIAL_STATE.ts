// Local imports
import { GlobalState } from '@/typedefs/GlobalState'

export const INITIAL_STATE: GlobalState = {
	gamesCatalog: null,
	gamesCatalogState: 'idle',
	quicksliceClient: null,
	user: null,
}
