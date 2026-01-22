// Local imports
import { type GAME_TYPES } from '@/constants/GAME_TYPES'

// Types
type ApplicationTypeID = keyof typeof GAME_TYPES

export const GAME_TYPES_CATEGORIES: {
	label: string
	items: ApplicationTypeID[]
}[] = [
	{
		label: 'Core',
		items: [
			'games.gamesgamesgamesgames.applicationType#game',
			'games.gamesgamesgamesgames.applicationType#port',
			'games.gamesgamesgamesgames.applicationType#remake',
			'games.gamesgamesgamesgames.applicationType#remaster',
			'games.gamesgamesgamesgames.applicationType#expandedGame',
			'games.gamesgamesgamesgames.applicationType#standaloneExpansion',
		],
	},
	{
		label: 'Expansion',
		items: [
			'games.gamesgamesgamesgames.applicationType#dlc',
			'games.gamesgamesgamesgames.applicationType#addon',
			'games.gamesgamesgamesgames.applicationType#expansion',
		],
	},
	{
		label: 'Episodic',
		items: [
			'games.gamesgamesgamesgames.applicationType#bundle',
			'games.gamesgamesgamesgames.applicationType#season',
			'games.gamesgamesgamesgames.applicationType#update',
			'games.gamesgamesgamesgames.applicationType#episode',
		],
	},
	{
		label: 'Third Party',
		items: [
			'games.gamesgamesgamesgames.applicationType#mod',
			'games.gamesgamesgamesgames.applicationType#fork',
		],
	},
]
