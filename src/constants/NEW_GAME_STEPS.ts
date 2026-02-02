// Local imports
import { DashboardCatalogNewGameCategorization } from '@/components/DashboardCatalogNewGameCategorization/DashboardCatalogNewGameCategorization'
import { DashboardCatalogNewGameGeneral } from '@/components/DashboardCatalogNewGameGeneral/DashboardCatalogNewGameGeneral'
import { DashboardCatalogNewGameMedia } from '@/components/DashboardCatalogNewGamePage/DashboardCatalogNewGameMedia'
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
		title: 'Media',
		component: DashboardCatalogNewGameMedia,
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
