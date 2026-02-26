import { useEffect, useState } from 'react'

export type Country = {
	name: string
	code: string
	region: string
}

type RESTCountriesResponse = {
	name: { common: string }
	cca2: string
	region: string
}[]

const COUNTRIES_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,region'

let cachedCountries: Country[] | null = null

export function useCountries() {
	const [countries, setCountries] = useState<Country[]>(cachedCountries ?? [])
	const [isLoading, setIsLoading] = useState(cachedCountries === null)

	useEffect(() => {
		if (cachedCountries) return

		fetch(COUNTRIES_URL)
			.then((res) => res.json())
			.then((data: RESTCountriesResponse) => {
				const sorted = data
					.map((item) => ({
						name: item.name.common,
						code: item.cca2,
						region: item.region,
					}))
					.sort((a, b) => a.name.localeCompare(b.name))

				cachedCountries = sorted
				setCountries(sorted)
			})
			.catch((err) => {
				console.error('[pentaract] Failed to fetch countries:', err)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return { countries, isLoading }
}
