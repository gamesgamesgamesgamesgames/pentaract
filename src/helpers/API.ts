// Local imports
import { type DID } from '@/typedefs/DID'
import { type GameRecord } from '@/typedefs/GameRecord'
import { getAccessToken } from '@/helpers/oauth'

// Constants
const API_URL = process.env.NEXT_PUBLIC_HAPPYVIEW_URL!

export async function queryAPI(path: string, options: RequestInit = {}) {
	const token = getAccessToken()
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string>),
	}

	if (token) {
		headers['Authorization'] = `Bearer ${token}`
	}

	return fetch(`${API_URL}${path}`, {
		...options,
		headers,
	})
}

export async function getGame(_uri: string): Promise<GameRecord | undefined> {
	console.warn('[pentaract] API.getGame is stubbed — HappyView data API not yet available')
	return undefined
}

export async function resolveHandle(_handle: string): Promise<DID | null> {
	console.warn('[pentaract] API.resolveHandle is stubbed — HappyView data API not yet available')
	return null
}
