export interface Game {
	did: `did:${string}:${string}`
	uri: `at://${string}`
	name: string
	summary?: string
	type?: string
	modes?: string[]
}
