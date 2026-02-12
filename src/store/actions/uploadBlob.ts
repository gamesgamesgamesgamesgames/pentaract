// Module imports
import { type Cid } from '@atproto/lex'

type UploadResult = {
	ref: Cid
	mimeType: string
	size: number
}

export async function uploadBlob(_file: File): Promise<UploadResult> {
	console.warn('[pentaract] uploadBlob is stubbed — HappyView data API not yet available')
	throw new Error('uploadBlob is not available yet')
}
