// Module imports
import Link from 'next/link'

// Local imports
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item'
import { TabsContent } from '@/components/ui/tabs'

// Types
type Props = Readonly<{
	developers: {
		name: string
		id: string
	}[]
	publishers: {
		name: string
		id: string
	}[]
}>

export async function GamePageCredits(props: Props) {
	const { developers, publishers } = props

	return (
		<TabsContent value={'credits'}>
			<Item>
				<ItemContent>
					<ItemTitle>{'Developers'}</ItemTitle>
					<ul className={'text-muted-foreground'}>
						{Boolean(developers.length) &&
							developers.map((developer, index) => (
								<li key={index}>
									<Link href={`/company/${developer.id}`}>
										{developer.name}
									</Link>
								</li>
							))}
					</ul>
				</ItemContent>
			</Item>

			<Item>
				<ItemContent>
					<ItemTitle>{'Publishers'}</ItemTitle>
					<ul className={'text-muted-foreground'}>
						{Boolean(publishers.length) &&
							publishers.map((publisher, index) => (
								<li key={index}>
									<Link href={`/company/${publisher.id}`}>
										{publisher.name}
									</Link>
								</li>
							))}
					</ul>
				</ItemContent>
			</Item>
		</TabsContent>
	)
}
