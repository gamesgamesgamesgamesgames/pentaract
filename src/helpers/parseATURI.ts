// Local imports
import { ATURI } from '@/typedefs/ATURI'

export function parseATURI(uri: ATURI) {
	const parts = uri.replace(/^at:\/\//, '').split('/')

	return {
		collection: parts[1],
		did: parts[0],
		rkey: parts[2],
	}
}
