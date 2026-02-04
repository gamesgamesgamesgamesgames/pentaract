// Local imports
import { CategorizationContent } from '@/components/DashboardCatalogNewGamePage/CategorizationContent'
import { GeneralContent } from '@/components/DashboardCatalogNewGamePage/GeneralContent'
import { MediaContent } from '@/components/DashboardCatalogNewGamePage/MediaContent'
import { ReleasesContent } from '@/components/DashboardCatalogNewGamePage/ReleasesContent'
import { ReviewContent } from '@/components/DashboardCatalogNewGamePage/ReviewContent'
import { type StepperStep } from '@/typedefs/StepperStep'

export const NEW_GAME_STEPS: StepperStep[] = [
	{
		title: 'General',
		component: GeneralContent,
	},
	{
		title: 'Categorization',
		component: CategorizationContent,
	},
	{
		title: 'Media',
		component: MediaContent,
	},
	{
		title: 'Releases',
		component: ReleasesContent,
	},
	{
		title: 'Review',
		component: ReviewContent,
	},
]
