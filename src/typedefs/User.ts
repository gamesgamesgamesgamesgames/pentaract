// Module imports
import { type User as QuicksliceUser } from 'quickslice-client-js'

export type User = QuicksliceUser & {
	description?: string
	displayName?: string
	handle?: string
	avatarURL?: string
}
