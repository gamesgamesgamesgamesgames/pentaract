// Local imports
import { type OAuthTokens } from '@/helpers/oauth'
import { type Game } from '@/typedefs/Game'
import { type User } from '@/typedefs/User'

export type ProfileType = 'actor' | 'org'

export type GlobalState = {
	authTokens: null | OAuthTokens
	gamesCatalog: null | Game[]
	gamesCatalogCursor: null | string
	gamesCatalogHasNextPage: boolean
	profileType: null | ProfileType
	user: null | User
}
