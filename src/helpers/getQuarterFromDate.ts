export function getQuarterFromDate(date: Date): 'Q1' | 'Q2' | 'Q3' | 'Q4' {
	const month = date.getMonth()
	if (month < 3) return 'Q1'
	if (month < 6) return 'Q2'
	if (month < 9) return 'Q3'
	return 'Q4'
}
