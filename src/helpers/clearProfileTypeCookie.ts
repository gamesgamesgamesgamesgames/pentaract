export function clearProfileTypeCookie() {
	document.cookie = 'pentaract_profile_type=; path=/; max-age=0; SameSite=Lax; Secure'
}
