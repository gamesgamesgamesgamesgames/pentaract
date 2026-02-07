export function setAuthCookie() {
	document.cookie =
		'qs_authenticated=1; path=/; max-age=1209600; SameSite=Lax; Secure'
}
