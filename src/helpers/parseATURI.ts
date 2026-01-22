// Module imports
import { type AtUriString } from '@atproto/lex'

export function parseATURI(uri: AtUriString) {
	const parts = uri.replace(/^at:\/\//, '').split('/')

	return {
		collection: parts[1],
		did: parts[0],
		rkey: parts[2],
	}
}
