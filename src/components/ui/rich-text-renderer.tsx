import { type Main as Facet } from '@/helpers/lexicons/app/bsky/richtext/facet.defs'

type Props = {
	text: string
	facets?: Facet[]
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function byteToCharOffset(text: string, byteOffset: number): number {
	const bytes = encoder.encode(text)
	return decoder.decode(bytes.slice(0, byteOffset)).length
}

export function RichTextRenderer({ text, facets }: Props) {
	if (!facets?.length) {
		return <span>{text}</span>
	}

	const sorted = [...facets].sort(
		(a, b) => a.index.byteStart - b.index.byteStart,
	)

	const segments: React.ReactNode[] = []
	let lastCharIndex = 0

	for (let i = 0; i < sorted.length; i++) {
		const facet = sorted[i]
		const charStart = byteToCharOffset(text, facet.index.byteStart)
		const charEnd = byteToCharOffset(text, facet.index.byteEnd)

		if (charStart > lastCharIndex) {
			segments.push(text.slice(lastCharIndex, charStart))
		}

		const slice = text.slice(charStart, charEnd)
		const feature = facet.features[0]

		if (feature?.$type === 'app.bsky.richtext.facet#link') {
			segments.push(
				<a
					key={i}
					className={'text-blue-500 hover:underline'}
					href={'uri' in feature ? (feature.uri as string) : '#'}
					target={'_blank'}
					rel={'noopener noreferrer'}>
					{slice}
				</a>,
			)
		} else if (feature?.$type === 'app.bsky.richtext.facet#tag') {
			segments.push(
				<span
					key={i}
					className={'text-blue-500'}>
					{slice}
				</span>,
			)
		} else if (feature?.$type === 'app.bsky.richtext.facet#mention') {
			const did = 'did' in feature ? (feature.did as string) : ''
			segments.push(
				<a
					key={i}
					className={'text-blue-500 hover:underline'}
					href={`/did/${did}`}>
					{slice}
				</a>,
			)
		} else {
			segments.push(slice)
		}

		lastCharIndex = charEnd
	}

	if (lastCharIndex < text.length) {
		segments.push(text.slice(lastCharIndex))
	}

	return <span>{segments}</span>
}
