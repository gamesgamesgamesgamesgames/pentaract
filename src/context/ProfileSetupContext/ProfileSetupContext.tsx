'use client'

// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type PropsWithChildren,
} from 'react'
import { useRouter } from 'next/navigation'

// Local imports
import * as API from '@/helpers/API'
import { type ProfileType } from '@/typedefs/GlobalState'
import { type ProfileSourceData } from '@/typedefs/ProfileSourceData'
import { fetchPrefillData } from '@/helpers/fetchPrefillData'
import { generateSlug } from '@/helpers/generateSlug'
import { type StepperStep } from '@/typedefs/StepperStep'
import { type l } from '@atproto/lex'
import { type State } from '@/typedefs/State'
import { type Website } from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'
import { setProfileTypeCookie } from '@/helpers/setProfileTypeCookie'
import { store } from '@/store/store'
import { AccountTypeStep } from '@/components/ProfileSetupPage/AccountTypeStep'
import { ActorProfileStep } from '@/components/ProfileSetupPage/ActorProfileStep'
import { OrgProfileStep } from '@/components/ProfileSetupPage/OrgProfileStep'
import { ReviewStep } from '@/components/ProfileSetupPage/ReviewStep'

// Types
type Props = Readonly<PropsWithChildren>

export const ProfileSetupContext = createContext<{
	// Form state
	accountType: ProfileType | null
	displayName: string
	description: string
	pronouns: string
	slug: string
	websites: Website[]
	avatarURL: string
	country: string
	foundedAt: string

	// Prefill
	prefillData: ProfileSourceData | null

	// Stepper
	currentStep: null | StepperStep
	currentStepIndex: number
	goToStepIndex: (stepIndex: number) => void
	hasNext: boolean
	hasPrevious: boolean
	nextStep: () => void
	previousStep: () => void
	steps: StepperStep[]

	// Actions
	setAccountType: (type: ProfileType) => void
	setDisplayName: (value: string) => void
	setDescription: (value: string) => void
	setPronouns: (value: string) => void
	setSlug: (value: string) => void
	setWebsites: (value: Website[]) => void
	setCountry: (value: string) => void
	setFoundedAt: (value: string) => void
	submitProfile: () => void
	state: State
}>({
	accountType: null,
	displayName: '',
	description: '',
	pronouns: '',
	slug: '',
	websites: [],
	avatarURL: '',
	country: '',
	foundedAt: '',

	prefillData: null,

	currentStep: null,
	currentStepIndex: 0,
	goToStepIndex: () => {},
	hasNext: false,
	hasPrevious: false,
	nextStep: () => {},
	previousStep: () => {},
	steps: [],

	setAccountType: () => {},
	setDisplayName: () => {},
	setDescription: () => {},
	setPronouns: () => {},
	setSlug: () => {},
	setWebsites: () => {},
	setCountry: () => {},
	setFoundedAt: () => {},
	submitProfile: () => {},
	state: 'idle',
})

export function ProfileSetupContextProvider(props: Props) {
	const { children } = props
	const router = useRouter()

	// Form state
	const [accountType, setAccountType] = useState<ProfileType | null>(null)
	const [displayName, setDisplayName] = useState('')
	const [description, setDescription] = useState('')
	const [pronouns, setPronouns] = useState('')
	const [slug, setSlug] = useState('')
	const [websites, setWebsites] = useState<Website[]>([])
	const [avatarURL, setAvatarURL] = useState('')
	const [country, setCountry] = useState('')
	const [foundedAt, setFoundedAt] = useState('')
	const [state, setState] = useState<State>('idle')
	const [prefillData, setPrefillData] = useState<ProfileSourceData | null>(null)

	// Track whether the user has manually edited the slug
	const slugTouchedRef = useRef(false)

	// Auto-generate slug from displayName unless manually edited
	useEffect(() => {
		if (!slugTouchedRef.current) {
			setSlug(generateSlug(displayName))
		}
	}, [displayName])

	// Wrap setSlug to track manual edits
	const handleSetSlug = useCallback((value: string) => {
		slugTouchedRef.current = true
		setSlug(value)
	}, [])

	// Steps depend on account type
	const steps = useMemo<StepperStep[]>(() => {
		const base: StepperStep[] = [
			{ title: 'Account Type', component: AccountTypeStep },
		]

		if (accountType === 'actor') {
			base.push({ title: 'Profile Details', component: ActorProfileStep })
		} else if (accountType === 'org') {
			base.push({ title: 'Organization Details', component: OrgProfileStep })
		}

		if (accountType) {
			base.push({ title: 'Review', component: ReviewStep })
		}

		return base
	}, [accountType])

	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	// Fetch prefill data on mount
	useEffect(() => {
		fetchPrefillData().then((data) => {
			setPrefillData(data)
			if (data.displayName) setDisplayName(data.displayName)
			if (data.description) setDescription(data.description)
			if (data.pronouns) setPronouns(data.pronouns)
			if (data.avatarURL) setAvatarURL(data.avatarURL)
		})
	}, [])

	const nextStep = useCallback(
		() => setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1)),
		[currentStepIndex, steps],
	)
	const previousStep = useCallback(
		() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1)),
		[currentStepIndex],
	)
	const goToStepIndex = useCallback(
		(stepIndex: number) => {
			if (stepIndex < 0 || stepIndex > steps.length - 1) {
				throw new RangeError(`Step ${stepIndex} doesn't exist.`)
			}
			setCurrentStepIndex(stepIndex)
		},
		[steps],
	)

	const submitProfile = useCallback(async () => {
		if (state !== 'idle' || !accountType) return

		setState('active')

		try {
			if (accountType === 'actor') {
				await API.createActorProfile({
					displayName: displayName || undefined,
					description: description || undefined,
					pronouns: pronouns || undefined,
					slug: slug || undefined,
					websites: websites.length ? websites : undefined,
					createdAt: new Date().toISOString(),
				})
			} else {
				await API.createOrgProfile({
					displayName: displayName || undefined,
					description: description || undefined,
					country: country || undefined,
					status: 'active',
					slug: slug || undefined,
					foundedAt: foundedAt
						? (new Date(foundedAt).toISOString() as l.DatetimeString)
						: undefined,
					websites: websites.length ? websites : undefined,
					createdAt: new Date().toISOString(),
				})
			}

			store.set(() => ({ profileType: accountType }))
			setProfileTypeCookie(accountType)
			router.replace('/dashboard')
		} catch (error) {
			console.error('[pentaract] Profile creation failed:', error)
			setState('idle')
		}
	}, [
		accountType,
		country,
		description,
		displayName,
		foundedAt,
		pronouns,
		router,
		slug,
		state,
		websites,
	])

	const providerValue = useMemo(
		() => ({
			accountType,
			displayName,
			description,
			pronouns,
			slug,
			websites,
			avatarURL,
			country,
			foundedAt,

			prefillData,

			currentStep: steps[currentStepIndex] ?? null,
			currentStepIndex,
			goToStepIndex,
			hasNext: currentStepIndex < steps.length - 1,
			hasPrevious: currentStepIndex !== 0,
			nextStep,
			previousStep,
			steps,

			setAccountType,
			setDisplayName,
			setDescription,
			setPronouns,
			setSlug: handleSetSlug,
			setWebsites,
			setCountry,
			setFoundedAt,
			submitProfile,
			state,
		}),
		[
			accountType,
			avatarURL,
			country,
			currentStepIndex,
			description,
			displayName,
			foundedAt,
			goToStepIndex,
			handleSetSlug,
			nextStep,
			prefillData,
			previousStep,
			pronouns,
			slug,
			state,
			steps,
			submitProfile,
			websites,
		],
	)

	return (
		<ProfileSetupContext.Provider value={providerValue}>
			{children}
		</ProfileSetupContext.Provider>
	)
}

export const useProfileSetupContext = () => useContext(ProfileSetupContext)
