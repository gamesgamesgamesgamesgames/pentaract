import { useEffect, useRef, useState } from 'react'

import { searchProfilesTypeahead } from '@/helpers/API'
import { type ProfileSummaryView } from '@/typedefs/PentaractAPISearchProfilesTypeaheadResult'

type UseProfileSearchOptions = {
	limit?: number
	debounceMs?: number
	minLength?: number
}

export function useProfileSearch(
	query: string,
	options: UseProfileSearchOptions = {},
) {
	const { limit = 10, debounceMs = 200, minLength = 2 } = options

	const [profiles, setProfiles] = useState<ProfileSummaryView[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const abortRef = useRef<AbortController | null>(null)

	useEffect(() => {
		if (query.length < minLength) {
			setProfiles([])
			setIsLoading(false)
			return
		}

		setIsLoading(true)

		const timeout = setTimeout(() => {
			abortRef.current?.abort()
			const controller = new AbortController()
			abortRef.current = controller

			searchProfilesTypeahead(query, limit)
				.then((result) => {
					if (!controller.signal.aborted) {
						setProfiles(result.profiles)
					}
				})
				.catch(() => {
					if (!controller.signal.aborted) {
						setProfiles([])
					}
				})
				.finally(() => {
					if (!controller.signal.aborted) {
						setIsLoading(false)
					}
				})
		}, debounceMs)

		return () => {
			clearTimeout(timeout)
			abortRef.current?.abort()
		}
	}, [query, limit, debounceMs, minLength])

	return { profiles, isLoading }
}
