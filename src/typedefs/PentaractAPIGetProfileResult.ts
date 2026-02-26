import { type Main as ActorProfile } from '@/helpers/lexicons/games/gamesgamesgamesgames/actor/profile.defs'
import { type Main as OrgProfile } from '@/helpers/lexicons/games/gamesgamesgamesgames/org/profile.defs'

export type PentaractAPIGetProfileResult = {
	profile: ActorProfile | OrgProfile | null
	profileType: 'actor' | 'org' | null
}
