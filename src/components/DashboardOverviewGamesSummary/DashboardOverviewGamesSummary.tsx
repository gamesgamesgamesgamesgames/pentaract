// Local imports
import { BoxArt } from '@/components/BoxArt/BoxArt'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/components/Link/Link'

export function DashboardOverviewGamesSummary() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>{'Games'}</CardTitle>
				</CardHeader>

				<div className={'flex flex-col w-full'}>
					<div className={'flex gap-3 justify-between'}>
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
						<BoxArt />
					</div>

					<Button
						asChild
						variant={'outline'}>
						<Link href={'/dashboard/catalog'}>{'See All'}</Link>
					</Button>
				</div>
			</Card>
		</>
	)
}
