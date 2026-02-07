// Local imports
import { clearAuthCookie } from '@/helpers/clearAuthCookie'
import { setAuthCookie } from '@/helpers/setAuthCookie'
import { store } from '@/store/store'

export async function login() {
	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot login before client is initialized.')
	}

	await quicksliceClient.handleRedirectCallback()
	setAuthCookie()
}

export async function syncAuthCookie() {
	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot sync auth before client is initialized.')
	}

	const isAuthenticated = await quicksliceClient.isAuthenticated()

	if (isAuthenticated) {
		setAuthCookie()
	} else {
		clearAuthCookie()
	}

	return isAuthenticated
}
