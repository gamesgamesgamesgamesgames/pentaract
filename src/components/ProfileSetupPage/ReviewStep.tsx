'use client'

// Local imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DataList,
	DataListLabel,
	DataListValue,
} from '@/components/DataList/DataList'
import { Scroller } from '@/components/ui/scroller'
import { useCountries } from '@/hooks/use-countries'
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'

export function ReviewStep() {
	const {
		accountType,
		avatarURL,
		country,
		description,
		displayName,
		foundedAt,
		pronouns,
	} = useProfileSetupContext()

	const { countries } = useCountries()
	const countryName = countries.find((c) => c.code === country)?.name

	return (
		<Scroller className={'h-full'}>
			<div className={'flex flex-col gap-4'}>
				{avatarURL && (
					<div className={'flex justify-center'}>
						<Avatar className={'h-20 w-20'}>
							<AvatarImage src={avatarURL} />
							<AvatarFallback>
								{displayName?.charAt(0)?.toUpperCase() ?? '?'}
							</AvatarFallback>
						</Avatar>
					</div>
				)}

				<DataList>
					<DataListLabel>{'Account Type'}</DataListLabel>
					<DataListValue>
						{accountType === 'actor' ? 'Individual' : 'Organization'}
					</DataListValue>

					<DataListLabel>{'Display Name'}</DataListLabel>
					<DataListValue>
						{displayName || (
							<span className={'italic text-muted-foreground'}>
								{'No display name provided'}
							</span>
						)}
					</DataListValue>

					<DataListLabel>{'Description'}</DataListLabel>
					<DataListValue>
						{description || (
							<span className={'italic text-muted-foreground'}>
								{'No description provided'}
							</span>
						)}
					</DataListValue>

					{accountType === 'actor' && (
						<>
							<DataListLabel>{'Pronouns'}</DataListLabel>
							<DataListValue>
								{pronouns || (
									<span className={'italic text-muted-foreground'}>
										{'No pronouns provided'}
									</span>
								)}
							</DataListValue>
						</>
					)}

					{accountType === 'org' && (
						<>
							<DataListLabel>{'Country'}</DataListLabel>
							<DataListValue>
								{(countryName ?? country) || (
									<span className={'italic text-muted-foreground'}>
										{'No country provided'}
									</span>
								)}
							</DataListValue>

							<DataListLabel>{'Founded Date'}</DataListLabel>
							<DataListValue>
								{foundedAt || (
									<span className={'italic text-muted-foreground'}>
										{'No date provided'}
									</span>
								)}
							</DataListValue>
						</>
					)}
				</DataList>
			</div>
		</Scroller>
	)
}
