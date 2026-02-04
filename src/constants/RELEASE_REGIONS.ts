// Local imports
import { ReleaseRegion } from '@/typedefs/ReleaseRegion'

export const RELEASE_REGIONS: ReleaseRegion[] = [
	{ id: 'worldwide', code: 'WW', label: 'Worldwide', timezone: null },
	{
		id: 'northAmerica',
		code: 'NA',
		label: 'North America',
		timezone: 'America/Los_Angeles',
		tzLabel: 'San Francisco',
	},
	{
		id: 'europe',
		code: 'EU',
		label: 'Europe',
		timezone: 'Europe/London',
		tzLabel: 'London',
	},
	{
		id: 'japan',
		code: 'JP',
		label: 'Japan',
		timezone: 'Asia/Tokyo',
		tzLabel: 'Tokyo',
	},
	{
		id: 'china',
		code: 'CH',
		label: 'China',
		timezone: 'Asia/Shanghai',
		tzLabel: 'Beijing',
	},
	{
		id: 'korea',
		code: 'KR',
		label: 'Korea',
		timezone: 'Asia/Seoul',
		tzLabel: 'Seoul',
	},
	{
		id: 'australia',
		code: 'AU',
		label: 'Australia',
		timezone: 'Australia/Sydney',
		tzLabel: 'Sydney',
	},
	{
		id: 'newZealand',
		code: 'NZ',
		label: 'New Zealand',
		timezone: 'Pacific/Auckland',
		tzLabel: 'Auckland',
	},
	{
		id: 'asia',
		code: 'AS',
		label: 'Asia',
		timezone: 'Asia/Tokyo',
		tzLabel: 'Tokyo',
	},
	{
		id: 'brazil',
		code: 'BR',
		label: 'Brazil',
		timezone: 'America/Sao_Paulo',
		tzLabel: 'São Paulo',
	},
]
