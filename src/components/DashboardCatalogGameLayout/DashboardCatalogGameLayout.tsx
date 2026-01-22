'use client'

// Module imports
import { Flex, Heading, TabNav } from '@radix-ui/themes'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

// Local imports
import {
	DashboardCatalogGameContextProvider,
	useDashboardCatalogGameContext,
} from '@/context/DashboardCatalogGameContext/DashboardCatalogGameContext'
import { type DID } from '@/typedefs/DID'

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

	return (
		<>
			{game !== null && (
				<>
					<Flex
						justify={'between'}
						mb={'4'}>
						<Heading as={'h2'}>{game.record.name}</Heading>
					</Flex>

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
				<Flex
					align={'center'}
					height={'100%'}
					justify={'center'}>
					{'Loading...'}
				</Flex>
			)}
		</>
	)
}
