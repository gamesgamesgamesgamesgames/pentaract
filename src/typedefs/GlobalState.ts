// Local imports
import { type OAuthTokens } from '@/helpers/oauth'
import { type Game } from '@/typedefs/Game'
import { type User } from '@/typedefs/User'

export type GlobalState = {
	authTokens: null | OAuthTokens
	gamesCatalog: null | Game[]
	gamesCatalogCursor: null | string
	gamesCatalogHasNextPage: boolean
	user: null | User
}
