// Local imports
import { clearAuthCookie } from '@/helpers/clearAuthCookie'
import { handleRedirectCallback, isAuthenticated } from '@/helpers/oauth'
import { setAuthCookie } from '@/helpers/setAuthCookie'
import { getUserProfile } from '@/store/actions/getUserProfile'
import { store } from '@/store/store'
import { subscribe } from '@/store/subscribe'

export async function login() {
	const tokens = await handleRedirectCallback()

	store.set(() => ({ authTokens: tokens }))
	setAuthCookie()
	await getUserProfile()
	subscribe()
}

export function syncAuthCookie() {
	const authenticated = isAuthenticated()

	if (authenticated) {
		setAuthCookie()
	} else {
		clearAuthCookie()
	}

	return authenticated
}
