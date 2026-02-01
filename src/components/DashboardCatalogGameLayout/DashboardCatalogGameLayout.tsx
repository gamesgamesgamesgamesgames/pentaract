'use client'

// Module imports
import { Heading, TabNav } from '@radix-ui/themes'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

// Local imports
import { Container } from '@/components/Container/Container'
import {
	DashboardCatalogGameContextProvider,
	useDashboardCatalogGameContext,
} from '@/context/DashboardCatalogGameContext/DashboardCatalogGameContext'
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader'
import { type DID } from '@/typedefs/DID'
import { useMemo } from 'react'

// Types
type Props = Readonly<LayoutProps<'/dashboard/catalog/[did]/[rkey]'>>

export function DashboardCatalogGameLayoutWrapper(props: Props) {
	return (
		<DashboardCatalogGameContextProvider>
			<DashboardCatalogGameLayout {...props} />
		</DashboardCatalogGameContextProvider>
	)
}

export function DashboardCatalogGameLayout(props: Props) {
	const { children } = props
	const pathname = usePathname()

	const params = useParams<{ did: DID; rkey: string }>()

	const did = decodeURIComponent(params.did)
	const rkey = decodeURIComponent(params.rkey)

	const { game } = useDashboardCatalogGameContext()

	// Constants
	const breadcrumbs = useMemo(
		() => [
			{
				label: 'My Catalog',
				url: '/dashboard/catalog',
			},
			{
				label: game?.record.name ?? 'Loading...',
				url: '/dashboard/catalog/new-game/general',
			},
		],
		[game],
	)

	return (
		<>
			<DashboardHeader breadcrumbs={breadcrumbs} />

			<Container>
				{game !== null && (
					<>
						<div className={'flex justify-between mb-4'}>
							<Heading as={'h2'}>{game.record.name}</Heading>
						</div>

						<TabNav.Root mb={'4'}>
							<TabNav.Link
								active={pathname.endsWith('overview')}
								asChild>
								<Link href={`/dashboard/catalog/${did}/${rkey}/overview`}>
									{'Overview'}
								</Link>
							</TabNav.Link>
							<TabNav.Link
								active={pathname.endsWith('details')}
								asChild>
								<Link href={`/dashboard/catalog/${did}/${rkey}/details`}>
									{'Details'}
								</Link>
							</TabNav.Link>
							<TabNav.Link
								active={pathname.endsWith('images')}
								asChild>
								<Link href={`/dashboard/catalog/${did}/${rkey}/images`}>
									{'Images'}
								</Link>
							</TabNav.Link>
						</TabNav.Root>
					</>
				)}

				{game?.isHydrated && children}

				{!game?.isHydrated && (
					<div className={'flex h-full justify-center'}>{'Loading...'}</div>
				)}
			</Container>
		</>
	)
}
