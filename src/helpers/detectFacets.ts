import { type Main as Facet } from '@/helpers/lexicons/app/bsky/richtext/facet.defs'

const URL_REGEX = /https?:\/\/[^\s)>\]]+/g
const TAG_REGEX = /(?<=^|\s)#(\w+)/g

const encoder = new TextEncoder()

function charToByteOffset(text: string, charIndex: number): number {
	return encoder.encode(text.slice(0, charIndex)).byteLength
}

export function detectFacets(text: string): Facet[] {
	const facets: Facet[] = []

	for (const match of text.matchAll(URL_REGEX)) {
		const start = match.index
		const end = start + match[0].length
		facets.push({
			index: {
				byteStart: charToByteOffset(text, start),
				byteEnd: charToByteOffset(text, end),
			},
			features: [
				{
					$type: 'app.bsky.richtext.facet#link',
					uri: match[0] as `${string}:${string}`,
				},
			],
		})
	}

	for (const match of text.matchAll(TAG_REGEX)) {
		const start = match.index
		const end = start + match[0].length
		facets.push({
			index: {
				byteStart: charToByteOffset(text, start),
				byteEnd: charToByteOffset(text, end),
			},
			features: [
				{
					$type: 'app.bsky.richtext.facet#tag',
					tag: match[1],
				},
			],
		})
	}

	return facets
}
