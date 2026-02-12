// Local imports
import { store } from '@/store/store'

export async function getUserProfile() {
	const { authTokens } = store.state

	if (!authTokens) {
		throw new Error('Cannot get user profile before logging in.')
	}

	store.set(() => ({
		user: {
			did: authTokens.sub,
		},
	}))
}
