// Local imports
import { PlayerPerspective } from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'
import PlayerPerspectiveLexicon from '@/lexicons/games/gamesgamesgamesgames/playerPerspective.json'

// Types
type PlayerPerspectiveLexiconIDs = keyof typeof PlayerPerspectiveLexicon.defs

export const GAME_PLAYER_PERSPECTIVES = Object.entries(PlayerPerspectiveLexicon.defs).reduce(
	(accumulator, kv) => {
		const [id, { description: name }] = kv as [
			PlayerPerspectiveLexiconIDs,
			{ description: string },
		]

		const fqid = `games.gamesgamesgamesgames.playerPerspective#${id}` as PlayerPerspective 

		accumulator[fqid] = {
			id,
			fqid,
			name,
		}

		return accumulator
	},
	{} as Record<PlayerPerspective, {
		id: PlayerPerspectiveLexiconIDs,
		fqid: PlayerPerspective,
		name: string,
	}>,
)
