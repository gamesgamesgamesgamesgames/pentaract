// Local imports
import { clearAuthCookie } from '@/helpers/clearAuthCookie'
import { store } from '@/store/store'

export function logout() {
	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot logout before client is initialized.')
	}

	clearAuthCookie()
	quicksliceClient.logout()
}
