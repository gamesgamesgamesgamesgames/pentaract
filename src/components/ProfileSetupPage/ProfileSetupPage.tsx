'use client'

// Local imports
import { Container } from '@/components/Container/Container'
import { ContentWrapper } from '@/components/ProfileSetupPage/ContentWrapper'
import { Footer } from '@/components/ProfileSetupPage/Footer'
import {
	ProfileSetupContextProvider,
} from '@/context/ProfileSetupContext/ProfileSetupContext'
import { Stepper } from '@/components/ProfileSetupPage/Stepper'

export function ProfileSetupPage() {
	return (
		<ProfileSetupContextProvider>
			<ProfileSetupPageInner />
		</ProfileSetupContextProvider>
	)
}

function ProfileSetupPageInner() {
	return (
		<>
			<div className={'border-b p-4'}>
				<h1 className={'text-xl font-semibold'}>{'Set Up Your Profile'}</h1>
			</div>

			<Container isScrollable={false}>
				<div className={'items-stretch flex gap-4 h-full overflow-hidden'}>
					<Stepper />

					<div className={'flex flex-col grow justify-stretch w-full'}>
						<ContentWrapper />

						<Footer />
					</div>
				</div>
			</Container>
		</>
	)
}
