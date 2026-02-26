// Local imports
import { getStoredTokens } from '@/helpers/oauth'
import { setProfileTypeCookie } from '@/helpers/setProfileTypeCookie'
import { getUserProfile } from '@/store/actions/getUserProfile'
import { syncAuthCookie } from '@/store/actions/login'
import { store } from '@/store/store'
import { subscribe } from '@/store/subscribe'

export async function initialize() {
	if (typeof window === 'undefined') {
		return
	}

	const tokens = getStoredTokens()

	if (tokens) {
		store.set(() => ({ authTokens: tokens }))
	}

	const isAuthed = syncAuthCookie()

	if (isAuthed) {
		await getUserProfile()

		const { profileType } = store.state
		if (profileType) {
			setProfileTypeCookie(profileType)
		}

		subscribe()
	}
}
