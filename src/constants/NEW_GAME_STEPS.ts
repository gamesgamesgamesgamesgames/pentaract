// Local imports
import { DashboardCatalogNewGameCategorization } from '@/components/DashboardCatalogNewGameCategorization/DashboardCatalogNewGameCategorization'
import { DashboardCatalogNewGameGeneral } from '@/components/DashboardCatalogNewGameGeneral/DashboardCatalogNewGameGeneral'
import { DashboardCatalogNewGameReleases } from '@/components/DashboardCatalogNewGameReleases/DashboardCatalogNewGameReleases'
import { DashboardCatalogNewGameReview } from '@/components/DashboardCatalogNewGameReview/DashboardCatalogNewGameReview'
import { type StepperStep } from '@/typedefs/StepperStep'

export const NEW_GAME_STEPS: StepperStep[] = [
	{
		title: 'General',
		component: DashboardCatalogNewGameGeneral,
	},
	{
		title: 'Categorization',
		component: DashboardCatalogNewGameCategorization,
	},
	{
		title: 'Releases',
		component: DashboardCatalogNewGameReleases,
	},
	{
		title: 'Review',
		component: DashboardCatalogNewGameReview,
	},
]
