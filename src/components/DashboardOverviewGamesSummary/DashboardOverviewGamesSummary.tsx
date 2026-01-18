// Module imports
import {
	Button,
	Card,
	Flex,
	Heading,
	ScrollArea,
	Section,
	Separator,
	Text,
} from '@radix-ui/themes'

// Local imports
import { BoxArt } from '@/components/BoxArt/BoxArt'
import { Link } from '@/components/Link/Link'

export function DashboardOverviewGamesSummary() {
	return (
		<Section pt={'0'}>
			<Card>
				<Flex
					direction={'column'}
					gap={'3'}
					width={'100%'}>
					<Heading>{'Games'}</Heading>

					<Separator size={'4'} />

					<Flex
						gap={'3'}
						justify={'between'}>
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
					</Flex>

					<Button
						asChild
						variant={'outline'}>
						<Link href={'/dashboard/catalog'}>
							<Text>{'See All'}</Text>
						</Link>
					</Button>
				</Flex>
			</Card>
		</Section>
	)
}
