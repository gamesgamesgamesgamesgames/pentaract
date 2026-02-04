// Local imports
import { type GameRecord } from '@/typedefs/GameRecord'
// import { type QuicksliceClient } from 'quickslice-client-js'

export async function getGame(/*client: QuicksliceClient, */ uri: string) {
	// if (!client) {
	// 	throw new Error('Cannot retrieve records without an instantiated client.')
	// }

	const response = await fetch(
		`https://${process.env.NEXT_PUBLIC_QUICKSLICE_SERVER_DOMAIN!}/graphql`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
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
									summary
									themes
								}
							}
						}
					}
				`,
				variables: { uri },
			}),
		},
	)

	const responseJSON = (await response.json()) as {
		data: {
			gamesGamesgamesgamesgamesGame: {
				edges: {
					node: GameRecord
				}[]
			}
		}
	}

	return responseJSON.data.gamesGamesgamesgamesgamesGame.edges[0]?.node
}
