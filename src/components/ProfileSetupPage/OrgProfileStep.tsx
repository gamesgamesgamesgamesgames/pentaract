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
import { Scroller } from '@/components/ui/scroller'
import { Textarea } from '@/components/ui/textarea'
import { type Country, useCountries } from '@/hooks/use-countries'
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'
import { Item, ItemContent, ItemDescription, ItemTitle } from '../ui/item'

export function OrgProfileStep() {
	const {
		avatarURL,
		country,
		description,
		displayName,
		foundedAt,
		setCountry,
		setDescription,
		setDisplayName,
		setFoundedAt,
	} = useProfileSetupContext()

	const { countries, isLoading } = useCountries()

	const handleDisplayNameChange = useCallback<
		ChangeEventHandler<HTMLInputElement>
	>((event) => setDisplayName(event.target.value), [setDisplayName])

	const handleDescriptionChange = useCallback<
		ChangeEventHandler<HTMLTextAreaElement>
	>((event) => setDescription(event.target.value), [setDescription])

	const handleFoundedAtChange = useCallback<
		ChangeEventHandler<HTMLInputElement>
	>((event) => setFoundedAt(event.target.value), [setFoundedAt])

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
							<Label htmlFor={'displayName'}>{'Organization Name'}</Label>
							<Input
								id={'displayName'}
								onChange={handleDisplayNameChange}
								placeholder={'Your organization name'}
								value={displayName}
							/>
						</div>

						<div className={'flex flex-col gap-2'}>
							<Label htmlFor={'description'}>{'Description'}</Label>
							<Textarea
								id={'description'}
								onChange={handleDescriptionChange}
								placeholder={'Describe your organization'}
								rows={4}
								value={description}
							/>
						</div>

						<div className={'flex flex-col gap-2'}>
							<Label>{'Country'}</Label>
							<Combobox
								disabled={isLoading}
								items={countries}
								itemToStringLabel={(item) => item.name}
								onValueChange={(value) => setCountry(value?.code ?? '')}
								value={countries.find((c) => c.code === country) ?? null}>
								<ComboboxInput
									placeholder={
										isLoading ? 'Loading countries...' : 'Select a country'
									}
								/>

								<ComboboxContent>
									<ComboboxEmpty>{'No country found'}</ComboboxEmpty>

									<ComboboxList>
										{(item: Country) => (
											<ComboboxItem
												key={item.code}
												value={item}>
												<Item
													size={'xs'}
													className='p-0'>
													<ItemContent>
														<ItemTitle className={'whitespace-nowrap'}>
															{item.name}
														</ItemTitle>
														<ItemDescription>
															{`${item.region} `}
															<span className='lowercase'>{`(${item.code})`}</span>
														</ItemDescription>
													</ItemContent>
												</Item>
											</ComboboxItem>
										)}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
						</div>

						<div className={'flex flex-col gap-2'}>
							<Label htmlFor={'foundedAt'}>{'Founded Date'}</Label>
							<Input
								id={'foundedAt'}
								onChange={handleFoundedAtChange}
								placeholder={'e.g. 2020-01-01'}
								type={'date'}
								value={foundedAt}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</Scroller>
	)
}
