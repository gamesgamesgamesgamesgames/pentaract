// Local imports
import * as API from '@/helpers/API'
import { store } from '@/store/store'

export async function getUserProfile() {
	const { authTokens } = store.state

	if (!authTokens) {
		throw new Error('Cannot get user profile before logging in.')
	}

	// Fetch Pentaract profile and Bluesky profile in parallel
	const [{ profile, profileType }, blueskyProfile] = await Promise.all([
		API.getProfile(),
		API.getBlueskyProfile(),
	])

	store.set(() => ({
		profileType: profileType as 'actor' | 'org' | null,
		user: {
			did: authTokens.sub,
			handle: blueskyProfile?.handle,
			displayName: profile?.displayName ?? blueskyProfile?.displayName,
			description: profile?.description ?? blueskyProfile?.description,
			avatarURL: blueskyProfile?.avatarURL,
		},
	}))
}
