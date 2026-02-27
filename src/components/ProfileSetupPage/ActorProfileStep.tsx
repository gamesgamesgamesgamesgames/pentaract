'use client'

// Module imports
import { type ChangeEventHandler, useCallback } from 'react'

// Local imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RichTextComposer } from '@/components/ui/rich-text-composer'
import { Scroller } from '@/components/ui/scroller'
import { type Main as Facet } from '@/helpers/lexicons/app/bsky/richtext/facet.defs'
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from '../ui/input-group'

type PronounOption = {
	label: string
	value: string
}

const PRONOUN_OPTIONS: PronounOption[] = [
	{ label: 'he/him', value: 'he/him' },
	{ label: 'she/her', value: 'she/her' },
	{ label: 'they/them', value: 'they/them' },
	{ label: 'he/they', value: 'he/they' },
	{ label: 'she/they', value: 'she/they' },
	{ label: 'xe/xem', value: 'xe/xem' },
	{ label: 'ze/hir', value: 'ze/hir' },
	{ label: 'it/its', value: 'it/its' },
	{ label: 'any pronouns', value: 'any pronouns' },
]

export function ActorProfileStep() {
	const {
		avatarURL,
		description,
		displayName,
		pronouns,
		slug,
		setDescription,
		setDescriptionFacets,
		setDisplayName,
		setPronouns,
		setSlug,
	} = useProfileSetupContext()

	const handleDisplayNameChange = useCallback<
		ChangeEventHandler<HTMLInputElement>
	>((event) => setDisplayName(event.target.value), [setDisplayName])

	const handleDescriptionChange = useCallback(
		(text: string, facets: Facet[]) => {
			setDescription(text)
			setDescriptionFacets(facets)
		},
		[setDescription, setDescriptionFacets],
	)

	const handleSlugChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(event) => setSlug(event.target.value),
		[setSlug],
	)

	return (
		<Scroller className={'h-full'}>
			<div className={'flex flex-col gap-4'}>
				{avatarURL && (
					<Card>
						<CardContent className={'flex items-center gap-4'}>
							<Avatar className={'h-16 w-16'}>
								<AvatarImage src={avatarURL} />
								<AvatarFallback>
									{displayName?.charAt(0)?.toUpperCase() ?? '?'}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className={'text-sm text-muted-foreground'}>
									{'Avatar imported from your Bluesky profile'}
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				<Card>
					<CardContent className={'flex flex-col gap-4'}>
						<div className={'flex flex-col gap-2'}>
							<Label htmlFor={'displayName'}>{'Display Name'}</Label>
							<Input
								id={'displayName'}
								onChange={handleDisplayNameChange}
								placeholder={'Your display name'}
								value={displayName}
							/>
						</div>

						<div className={'flex flex-col gap-2'}>
							<Label>{'Bio'}</Label>
							<RichTextComposer
								className={'min-h-[100px]'}
								onChange={handleDescriptionChange}
								placeholder={'Tell us about yourself'}
								value={description}
							/>
						</div>

						<div className={'flex flex-col gap-2'}>
							<Label>{'Pronouns'}</Label>
							<Combobox
								items={PRONOUN_OPTIONS}
								itemToStringLabel={(item) => item.label}
								onValueChange={(value) => setPronouns(value?.value ?? '')}
								value={
									PRONOUN_OPTIONS.find((p) => p.value === pronouns) ?? null
								}>
								<ComboboxInput placeholder={'Select or type your pronouns'} />

								<ComboboxContent>
									<ComboboxEmpty>{'No match found'}</ComboboxEmpty>

									<ComboboxList>
										{(item: PronounOption) => (
											<ComboboxItem
												key={item.value}
												value={item}>
												{item.label}
											</ComboboxItem>
										)}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
						</div>

						<div className={'flex flex-col gap-2'}>
							<Label htmlFor={'slug'}>{'Your Pentaract URL'}</Label>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText>
										{`${process.env.NEXT_PUBLIC_URL}/profile/`}
									</InputGroupText>
								</InputGroupAddon>

								<InputGroupInput
									className='h-auto !pl-0.5'
									id={'slug'}
									onChange={handleSlugChange}
									placeholder={'your-url-friendly-name'}
									value={slug}
								/>
							</InputGroup>
							<p className={'text-xs text-muted-foreground'}>
								{'The personalized URL for your profile on Pentaract.'}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</Scroller>
	)
}
