// Local imports
import { clearAuthCookie } from '@/helpers/clearAuthCookie'
import { logout as oauthLogout } from '@/helpers/oauth'

export function logout() {
	clearAuthCookie()
	oauthLogout()
}
