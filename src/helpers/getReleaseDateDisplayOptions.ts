// Module imports
import { format } from 'date-fns'

// Local imports
import { getQuarterFromDate } from '@/helpers/getQuarterFromDate'
import { type ReleaseDate } from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'

// Helper to format display based on format type
export function getReleaseDateDisplayOptions(
	date: Date | null,
): { id: ReleaseDate['releasedAtFormat']; label: string }[] {
	if (!date) {
		return [{ id: 'TBD', label: 'To Be Announced' }]
	}

	const quarter = getQuarterFromDate(date)
	const year = date.getFullYear()
	const monthName = format(date, 'MMMM')

	return [
		{ id: 'YYYY-MM-DD', label: format(date, 'MMMM d, yyyy') },
		{ id: 'YYYY-MM', label: `${monthName} ${year}` },
		{
			id: `YYYY-${quarter}` as ReleaseDate['releasedAtFormat'],
			label: `${quarter} ${year}`,
		},
		{ id: 'YYYY', label: `${year}` },
		{ id: 'TBD', label: 'To Be Announced' },
	]
}
