// Local imports
import { type DID } from '@/typedefs/DID'
import { type GameRecord } from '@/typedefs/GameRecord'

// Types
type QueryOptions = Readonly<{
	query: string
	variables: Record<string, unknown>
}>

// Constants
const API_URL = `https://${process.env.NEXT_PUBLIC_QUICKSLICE_SERVER_DOMAIN!}/graphql`

export async function queryAPI(options: QueryOptions) {
	const { query, variables } = options

	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	})
}

export async function queryJSONAPI<Shape>(options: QueryOptions) {
	const response = await queryAPI(options)

	return response.json() as Shape
}

export async function getGame(/*client: QuicksliceClient, */ uri: string) {
	const { data } = await queryJSONAPI<{
		data: {
			gamesGamesgamesgamesgamesGame: {
				edges: {
					node: GameRecord
				}[]
			}
		}
	}>({
		query: `
			query GetGame ($uri: String!) {
				gamesGamesgamesgamesgamesGame(
					where: {
						uri: {
							eq: $uri
						}
					}
				) {
					edges {
						node {
							uri
							did
							applicationType
							genres
							media {
								blob {
									ref
									url
								}
								description
								locale
								mediaType
								title
							}
							modes
							name
							playerPerspectives
							releases
							summary
							themes
						}
					}
				}
			}
		`,
		variables: { uri },
	})

	return data.gamesGamesgamesgamesgamesGame.edges[0]?.node
}

export async function resolveHandle(handle: string): Promise<DID | null> {
	const { data } = await queryJSONAPI<{
		data: {
			appBskyActorProfile: {
				edges: {
					node: {
						did: string
					}
				}[]
			}
		}
	}>({
		query: `
			query ResolveHandle ($handle: String!) {
				appBskyActorProfile(
					where: {
						actorHandle: {
							eq: $handle
						}
					}
					first: 1
				) {
					edges {
						node {
							did
						}
					}
				}
			}
		`,
		variables: { handle },
	})

	return (data.appBskyActorProfile.edges[0]?.node.did as DID) ?? null
}
