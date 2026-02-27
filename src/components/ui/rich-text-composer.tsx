'use client'

import { useCallback, useRef, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Mention,
	MentionContent,
	MentionInput,
	MentionItem,
} from '@/components/ui/mention'
import { detectFacets } from '@/helpers/detectFacets'
import { type Main as Facet } from '@/helpers/lexicons/app/bsky/richtext/facet.defs'
import { useProfileSearch } from '@/hooks/use-profile-search'
import { Textarea } from './textarea'

type Props = {
	value: string
	onChange: (text: string, facets: Facet[]) => void
	placeholder?: string
	className?: string
}

export function RichTextComposer({
	value,
	onChange,
	placeholder,
	className,
}: Props) {
	const [searchTerm, setSearchTerm] = useState('')
	const { profiles } = useProfileSearch(searchTerm)

	// Map mention display text -> DID
	const mentionMapRef = useRef(new Map<string, string>())
	const mentionValuesRef = useRef<string[]>([])

	const handleValueChange = useCallback((values: string[]) => {
		mentionValuesRef.current = values
	}, [])

	const handleInputValueChange = useCallback(
		(text: string) => {
			// Extract mention search term from text after the last @
			// DiceUI consumes the @ on selection, so the only @ in raw text
			// is the one the user is actively typing
			const lastAtIndex = text.lastIndexOf('@')
			if (lastAtIndex !== -1) {
				const afterAt = text.slice(lastAtIndex + 1)
				if (!afterAt.includes(' ') && !afterAt.includes('\n')) {
					setSearchTerm(afterAt)
				} else {
					setSearchTerm('')
				}
			} else {
				setSearchTerm('')
			}

			const autoFacets = detectFacets(text)

			const encoder = new TextEncoder()
			const mentionFacets: Facet[] = []

			for (const mentionValue of mentionValuesRef.current) {
				const did = mentionMapRef.current.get(mentionValue)
				if (!did) continue

				let searchFrom = 0
				while (true) {
					const idx = text.indexOf(mentionValue, searchFrom)
					if (idx === -1) break
					mentionFacets.push({
						index: {
							byteStart: encoder.encode(text.slice(0, idx)).byteLength,
							byteEnd: encoder.encode(text.slice(0, idx + mentionValue.length))
								.byteLength,
						},
						features: [
							{
								$type: 'app.bsky.richtext.facet#mention',
								did: did as `did:${string}:${string}`,
							},
						],
					})
					searchFrom = idx + mentionValue.length
				}
			}

			onChange(text, [...autoFacets, ...mentionFacets])
		},
		[onChange],
	)

	return (
		<Mention
			trigger={'@'}
			onValueChange={handleValueChange}
			onInputValueChange={handleInputValueChange}
			inputValue={value}>
			<MentionInput
				asChild
				className={className}
				placeholder={placeholder}>
				<Textarea value={value} />
			</MentionInput>
			<MentionContent>
				{profiles.map((profile) => {
					const label = profile.displayName || profile.did
					mentionMapRef.current.set(label, profile.did)
					return (
						<MentionItem
							key={profile.did}
							value={label}>
							<Avatar className={'h-6 w-6'}>
								{profile.avatar && (
									<AvatarImage
										src={
											typeof profile.avatar === 'object' &&
											'ref' in profile.avatar
												? undefined
												: undefined
										}
									/>
								)}
								<AvatarFallback className={'text-xs'}>
									{label.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span className={'truncate'}>{label}</span>
						</MentionItem>
					)
				})}
			</MentionContent>
		</Mention>
	)
}
