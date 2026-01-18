'use client'

// Module imports
import { useEffect } from 'react'
import { useStore } from 'statery'

// Local imports
import { store } from '@/store/store'

export function AuthManager() {
	const { quicksliceClient } = useStore(store)

	useEffect(() => {
		if (quicksliceClient) {
			if (window.location.search.includes('code=')) {
				quicksliceClient
					.handleRedirectCallback()
					.then(() => window.history.replaceState({}, '', '/'))
			}
		}
	}, [quicksliceClient])

	return null
}
