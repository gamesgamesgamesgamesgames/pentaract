// Local imports
import { type ProfileType } from '@/typedefs/GlobalState'

export function setProfileTypeCookie(profileType: ProfileType) {
	document.cookie =
		`pentaract_profile_type=${profileType}; path=/; max-age=1209600; SameSite=Lax; Secure`
}
