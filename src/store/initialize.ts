// Local imports
import { createQuicksliceClient } from '@/helpers/createQuicksliceClient'
import { getUserProfile } from '@/store/actions/getUserProfile'
import { syncAuthCookie } from '@/store/actions/login'
import { store } from '@/store/store'
import { subscribe } from '@/store/subscribe'

export async function initialize() {
	if (typeof window === 'undefined') {
		return
	}

	const quicksliceClient = await createQuicksliceClient()
	store.set(() => ({ quicksliceClient }))

	const isAuthed = await syncAuthCookie()

	if (isAuthed) {
		await getUserProfile()
		subscribe()
	}
}
