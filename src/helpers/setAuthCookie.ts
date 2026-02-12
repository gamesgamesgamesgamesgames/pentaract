export function setAuthCookie() {
	document.cookie =
		'pentaract_authenticated=1; path=/; max-age=1209600; SameSite=Lax; Secure'
}
