// Module imports
import { createQuicksliceClient } from 'quickslice-client-js'

// Local imports
import { store } from '@/store/store'

export async function initialize() {
	if (typeof window === 'undefined') {
		return
	}

	const quicksliceClient = await createQuicksliceClient({
		clientId: process.env.NEXT_PUBLIC_QUICKSLICE_CLIENT_ID!,
		redirectUri: process.env.NEXT_PUBLIC_QUICKSLICE_REDIRECT_URI!,
		server: process.env.NEXT_PUBLIC_QUICKSLICE_SERVER!,
	})

	store.set(() => ({ quicksliceClient }))

	if (await quicksliceClient.isAuthenticated()) {
		const user = await quicksliceClient.getUser()
		console.log(`Logged in as ${user!.did}`)
		store.set(() => ({ user }))
	}
}
