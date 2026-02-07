export function clearAuthCookie() {
	document.cookie = 'qs_authenticated=; path=/; max-age=0; SameSite=Lax; Secure'
}
