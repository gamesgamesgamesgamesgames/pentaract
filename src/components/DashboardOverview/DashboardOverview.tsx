// Module imports
import { Heading } from '@radix-ui/themes'

// Local imports
import { DashboardMainWrapper } from '@/components/DashboardMainWrapper/DashboardMainWrapper'
import { DashboardOverviewGamesSummary } from '@/components/DashboardOverviewGamesSummary/DashboardOverviewGamesSummary'

export function DashboardOverview() {
	return (
		<DashboardMainWrapper>
			<DashboardOverviewGamesSummary />
		</DashboardMainWrapper>
	)
}
