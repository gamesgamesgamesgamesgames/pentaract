// Module imports
import { format } from 'date-fns'

// Local imports
import { type ReleaseDate } from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'

// Helper to format the display value
export function getReleaseDateString(
	releasedAt: string | undefined,
	releasedAtFormat: ReleaseDate['releasedAtFormat'],
): string {
	if (!releasedAtFormat || releasedAtFormat === 'TBD') {
		return 'To Be Announced'
	}

	if (!releasedAt) {
		return 'Not set'
	}

	const date = new Date(releasedAt)
	if (isNaN(date.getTime())) {
		return releasedAt
	}

	switch (releasedAtFormat) {
		case 'YYYY-MM-DD':
			return format(date, 'MMMM d, yyyy')
		case 'YYYY-MM':
			return format(date, 'MMMM yyyy')
		case 'YYYY-Q1':
		case 'YYYY-Q2':
		case 'YYYY-Q3':
		case 'YYYY-Q4':
			return `${releasedAtFormat.slice(-2)} ${date.getFullYear()}`
		case 'YYYY':
			return `${date.getFullYear()}`
		default:
			return releasedAt
	}
}
