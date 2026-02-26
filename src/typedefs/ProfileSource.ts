import { type ProfileSourceData } from '@/typedefs/ProfileSourceData'

export type ProfileSource = {
	name: string
	fetch: () => Promise<ProfileSourceData | null>
}
