// Local imports
import { GlobalState } from '@/typedefs/GlobalState'

export const INITIAL_STATE: GlobalState = {
	authTokens: null,
	gamesCatalog: null,
	gamesCatalogCursor: null,
	gamesCatalogHasNextPage: true,
	profileType: null,
	user: null,
}
