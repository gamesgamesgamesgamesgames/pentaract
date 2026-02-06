import { type DID } from '@/typedefs/DID'

export function isDID(value: string): value is DID {
	return value.startsWith('did:')
}
