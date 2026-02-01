// Local imports
import { createQuicksliceClient } from '@/helpers/createQuicksliceClient'
import { getUserProfile } from '@/store/actions/getUserProfile'
import { store } from '@/store/store'
import { subscribe } from '@/store/subscribe'

export async function initialize() {
	if (typeof window === 'undefined') {
		return
	}

	const quicksliceClient = await createQuicksliceClient()

	store.set(() => ({ quicksliceClient }))

	if (await quicksliceClient.isAuthenticated()) {
		await getUserProfile()
		subscribe()
	}
}
