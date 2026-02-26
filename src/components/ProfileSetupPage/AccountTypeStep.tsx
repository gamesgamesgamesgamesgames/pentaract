'use client'

// Module imports
import { useCallback } from 'react'

// Local imports
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card'
import { Scroller } from '@/components/ui/scroller'
import { useProfileSetupContext } from '@/context/ProfileSetupContext/ProfileSetupContext'

export function AccountTypeStep() {
	const { accountType, setAccountType, nextStep } = useProfileSetupContext()

	const handleSelectIndividual = useCallback(() => {
		setAccountType('actor')
		nextStep()
	}, [nextStep, setAccountType])

	const handleSelectOrganization = useCallback(() => {
		setAccountType('org')
		nextStep()
	}, [nextStep, setAccountType])

	return (
		<Scroller className={'h-full'}>
			<div className={'flex flex-col gap-4 max-w-lg mx-auto'}>
				<div className={'text-center mb-4'}>
					<h2 className={'text-2xl font-bold'}>
						{'What type of account is this?'}
					</h2>
					<p className={'text-muted-foreground mt-2'}>
						{"Choose the type that best describes how you'll use Pentaract."}
					</p>
				</div>

				<Card
					className={`cursor-pointer transition-colors hover:border-primary ${accountType === 'actor' ? 'border-primary' : ''}`}
					onClick={handleSelectIndividual}>
					<CardHeader>
						<CardTitle>{'Individual'}</CardTitle>
						<CardDescription>
							{
								'For people who want to catalog, review, and manage game data under their own identity.'
							}
						</CardDescription>
					</CardHeader>
				</Card>

				<Card
					className={`cursor-pointer transition-colors hover:border-primary ${accountType === 'org' ? 'border-primary' : ''}`}
					onClick={handleSelectOrganization}>
					<CardHeader>
						<CardTitle>{'Organization'}</CardTitle>
						<CardDescription>
							{
								'For studios, publishers, and other organizations that manage game catalogs.'
							}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</Scroller>
	)
}
