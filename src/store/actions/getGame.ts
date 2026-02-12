// Local imports
import { type Game } from '@/typedefs/Game'

export async function getGame(_uri: string): Promise<Game | undefined> {
	console.warn('[pentaract] getGame is stubbed — HappyView data API not yet available')
	return undefined
}
