export function clearAuthCookie() {
	document.cookie = 'pentaract_authenticated=; path=/; max-age=0; SameSite=Lax; Secure'
}
