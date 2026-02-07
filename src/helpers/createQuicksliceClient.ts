import { createQuicksliceClient as createClient } from '@gamesgamesgamesgamesgames/quickslice-client-js'

export async function createQuicksliceClient() {
	return createClient({
		clientId: process.env.NEXT_PUBLIC_QUICKSLICE_CLIENT_ID!,
		redirectUri: process.env.NEXT_PUBLIC_QUICKSLICE_REDIRECT_URI!,
		server: `https://${process.env.NEXT_PUBLIC_QUICKSLICE_SERVER_DOMAIN!}`,
	})
}
