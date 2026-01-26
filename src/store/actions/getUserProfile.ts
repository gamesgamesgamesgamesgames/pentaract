// Local imports
import { store } from '@/store/store'

export async function getUserProfile() {
	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot list games before logging in.')
	}

	const result = await quicksliceClient.query<{
		viewer: {
			did: string
			handle: string
			appBskyActorProfileByDid: null | {
				displayName: string
				description: string
				avatar: {
					url: string
				}
			}
		}
	}>(
		`
    query UserProfile {
      viewer {
        did
        handle
        appBskyActorProfileByDid {
          displayName
          description
          avatar { url(preset: "avatar") }
        }
      }
    }
		`,
	)

	store.set(() => ({
		user: {
			avatarURL: result.viewer.appBskyActorProfileByDid?.avatar.url,
			description: result.viewer.appBskyActorProfileByDid?.description,
			did: result.viewer.did,
			displayName: result.viewer.appBskyActorProfileByDid?.displayName,
			handle: result.viewer.handle,
		},
	}))
}
