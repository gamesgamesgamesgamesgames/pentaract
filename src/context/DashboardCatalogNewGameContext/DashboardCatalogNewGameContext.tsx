'use client'

// Moduile imports
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
	type PropsWithChildren,
} from 'react'
import { useRouter } from 'next/navigation'

// Local imports
import { createGame } from '@/store/actions/createGame'
import { type GameRecord } from '@/typedefs/GameRecord'
import {
	type Genre,
	type Mode,
	type PlayerPerspective,
	type Release,
	type Theme,
} from '@/helpers/lexicons/games/gamesgamesgamesgames/defs.defs'
import { GenreError } from '@/context/DashboardCatalogNewGameContext/GenreError'
import { type MediaItem } from '@/typedefs/MediaItem'
import { ModeError } from '@/context/DashboardCatalogNewGameContext/ModeError'
import { NameError } from '@/context/DashboardCatalogNewGameContext/NameError'
import { NEW_GAME_STEPS } from '@/constants/NEW_GAME_STEPS'
import { PlayerPerspectiveError } from '@/context/DashboardCatalogNewGameContext/PlayerPerspectiveError'
import { ReleaseError } from '@/context/DashboardCatalogNewGameContext/ReleaseError'
import { parseATURI } from '@/helpers/parseATURI'
import { type State } from '@/typedefs/State'
import { type StepperStep } from '@/typedefs/StepperStep'
import { SummaryError } from '@/context/DashboardCatalogNewGameContext/SummaryError'
import { uploadBlob } from '@/store/actions/uploadBlob'

// Types
type Props = Readonly<PropsWithChildren>

export const DashboardCatalogNewGameContext = createContext<
	Partial<
		Omit<GameRecord, 'genres' | 'modes' | 'playerPerspectives' | 'themes'>
	> & {
		genres: Set<Genre>
		media: Map<File, MediaItem>
		modes: Set<Mode>
		playerPerspectives: Set<PlayerPerspective>
		themes: Set<Theme>

		addGenre: (genre: Genre) => void
		addMode: (mode: Mode) => void
		addPlayerPerspective: (playerPerspective: PlayerPerspective) => void
		addTheme: (theme: Theme) => void
		currentStep: null | StepperStep
		currentStepIndex: number
		goToStepIndex: (stepIndex: number) => void
		hasNext: boolean
		hasPrevious: boolean
		nextStep: () => void
		previousStep: () => void
		publishGame: () => void
		publishErrors: ReactNode[]
		removeGenre: (genre: Genre) => void
		removeMedia: (mediaItem: MediaItem) => void
		removeMode: (mode: Mode) => void
		removePlayerPerspective: (playerPerspective: PlayerPerspective) => void
		removeTheme: (theme: Theme) => void
		saveErrors: ReactNode[]
		saveGameDraft: () => void
		releases: Release[]
		setApplicationType: (applicationType: GameRecord['applicationType']) => void
		setName: (name: GameRecord['name']) => void
		setReleases: (releases: Release[]) => void
		setSummary: (summary: GameRecord['summary']) => void
		state: State
		steps: StepperStep[]
		updateAllMedia: (files: File[]) => void
		updateMedia: (mediaItem: MediaItem) => void
		uploadProgress: null | number
		uploadTotal: null | number
	}
>({
	genres: new Set(),
	media: new Map(),
	modes: new Set(),
	playerPerspectives: new Set(),
	themes: new Set(),

	addGenre: () => {},
	addMode: () => {},
	addPlayerPerspective: () => {},
	addTheme: () => {},
	applicationType: 'games.gamesgamesgamesgames.applicationType#game',
	currentStep: null,
	currentStepIndex: 0,
	goToStepIndex: () => {},
	hasNext: false,
	hasPrevious: false,
	nextStep: () => {},
	previousStep: () => {},
	publishGame: () => {},
	publishErrors: [],
	removeGenre: () => {},
	removeMedia: () => {},
	removeMode: () => {},
	removePlayerPerspective: () => {},
	releases: [],
	removeTheme: () => {},
	saveErrors: [],
	saveGameDraft: () => {},
	setApplicationType: () => {},
	setName: () => {},
	setReleases: () => {},
	setSummary: () => {},
	state: 'idle',
	steps: [],
	updateAllMedia: () => {},
	updateMedia: () => {},
	uploadProgress: null,
	uploadTotal: null,
})

export function DashboardCatalogNewGameContextProvider(props: Props) {
	const { children } = props

	const router = useRouter()

	const [steps] = useState(NEW_GAME_STEPS)

	const [currentStepIndex, setCurrentStepIndex] = useState(0)
	const [state, setState] = useState<State>('idle')
	const [uploadProgress, setUploadProgress] = useState<null | number>(null)
	const [uploadTotal, setUploadTotal] = useState<null | number>(null)

	const [name, setName] = useState<GameRecord['name']>('')
	const [media, setMedia] = useState<Map<File, MediaItem>>(new Map())
	const [genres, setGenres] = useState<Set<Genre>>(new Set())
	const [modes, setModes] = useState<Set<Mode>>(new Set())
	const [themes, setThemes] = useState<Set<Theme>>(new Set())
	const [summary, setSummary] = useState<GameRecord['summary']>('')
	const [releases, setReleases] = useState<Release[]>([
		{
			platform: '',
			releaseDates: [
				{
					releasedAt: '',
					releasedAtFormat: 'TBD',
					region: '',
					status: 'release',
				},
			],
		},
	])
	const [applicationType, setApplicationType] = useState<
		GameRecord['applicationType']
	>('games.gamesgamesgamesgames.applicationType#game')
	const [playerPerspectives, setPlayerPerspectives] = useState<
		Set<PlayerPerspective>
	>(new Set())

	const addGenre = useCallback((genre: Genre) => {
		setGenres((previousState) => {
			const newState = new Set(previousState)
			newState.add(genre)
			return newState
		})
	}, [])

	const removeGenre = useCallback((genre: Genre) => {
		setGenres((previousState) => {
			const newState = new Set(previousState)
			newState.delete(genre)
			return newState
		})
	}, [])

	const addMode = useCallback((mode: Mode) => {
		setModes((previousState) => {
			const newState = new Set(previousState)
			newState.add(mode)
			return newState
		})
	}, [])

	const removeMode = useCallback((mode: Mode) => {
		setModes((previousState) => {
			const newState = new Set(previousState)
			newState.delete(mode)
			return newState
		})
	}, [])

	const addPlayerPerspective = useCallback(
		(playerPerspective: PlayerPerspective) => {
			setPlayerPerspectives((previousState) => {
				const newState = new Set(previousState)
				newState.add(playerPerspective)
				return newState
			})
		},
		[],
	)

	const removePlayerPerspective = useCallback(
		(playerPerspective: PlayerPerspective) => {
			setPlayerPerspectives((previousState) => {
				const newState = new Set(previousState)
				newState.delete(playerPerspective)
				return newState
			})
		},
		[],
	)

	const addTheme = useCallback((theme: Theme) => {
		setThemes((previousState) => {
			const newState = new Set(previousState)
			newState.add(theme)
			return newState
		})
	}, [])

	const removeTheme = useCallback((theme: Theme) => {
		setThemes((previousState) => {
			const newState = new Set(previousState)
			newState.delete(theme)
			return newState
		})
	}, [])

	const uploadMedia = useCallback(async () => {
		const mediaArray = Array.from(media.values())

		setUploadTotal(
			mediaArray.reduce(
				(accumulator, mediaItem) => accumulator + mediaItem.file!.size,
				0,
			),
		)
		setUploadProgress(0)

		for (const mediaItem of mediaArray) {
			const result = await uploadBlob(mediaItem.file!)
			mediaItem.blob = result
			setUploadProgress(
				(previousState) => previousState! + mediaItem.file!.size,
			)
		}
	}, [media])

	const saveGame = useCallback(
		async (shouldPublish: boolean) => {
			if (state === 'idle') {
				setState('active')

				await uploadMedia()

				const recordURI = await createGame(
					{
						applicationType,
						genres: Array.from(genres || []),
						media: Array.from(media.values()),
						modes: Array.from(modes || []),
						name,
						playerPerspectives: Array.from(playerPerspectives || []),
						releases,
						summary,
						themes: Array.from(themes || []),
					},
					{ shouldPublish },
				)

				const { did, rkey } = parseATURI(recordURI)
				router.push(`/game/${did}/${rkey}`)
			}
		},
		[
			applicationType,
			genres,
			media,
			modes,
			name,
			playerPerspectives,
			releases,
			state,
			summary,
			themes,
			uploadMedia,
		],
	)

	const updateAllMedia = useCallback((files: File[]) => {
		setMedia((previousState) => {
			const newState = new Map(previousState)

			files.forEach((file) => {
				if (!newState.has(file)) {
					newState.set(file, {
						blob: null,
						description: '',
						height: null,
						file,
						locale: null,
						mediaType: null,
						title: '',
						width: null,
					})
				}
			})

			return newState
		})
	}, [])

	const updateMedia = useCallback((mediaItem: MediaItem) => {
		setMedia((previousState) => {
			const newState = new Map(previousState)

			newState.set(mediaItem.file!, mediaItem)

			return newState
		})
	}, [])

	const removeMedia = useCallback((mediaItem: MediaItem) => {
		setMedia((previousState) => {
			const newState = new Map(previousState)

			newState.delete(mediaItem.file!)

			return newState
		})
	}, [])

	const nextStep = useCallback(
		() => setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1)),
		[currentStepIndex, steps],
	)
	const previousStep = useCallback(
		() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1)),
		[currentStepIndex, steps],
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

	const publishGame = useCallback(() => saveGame(true), [saveGame])
	const saveGameDraft = useCallback(() => saveGame(false), [saveGame])

	// Check if there's at least one valid release with a complete release date
	const hasValidRelease = releases.some(
		(release) =>
			release.platform &&
			release.releaseDates?.some(
				(rd) => rd.region && rd.status,
			),
	)

	const providerValue = useMemo(
		() => ({
			currentStep: steps[currentStepIndex],
			hasNext: currentStepIndex < steps.length - 1,
			hasPrevious: currentStepIndex !== 0,
			publishErrors: [
				name ? null : <NameError />,
				summary ? null : <SummaryError />,
				genres!.size ? null : <GenreError />,
				modes!.size ? null : <ModeError />,
				playerPerspectives!.size ? null : <PlayerPerspectiveError />,
				hasValidRelease ? null : <ReleaseError />,
			].filter(Boolean) as ReactNode[],
			saveErrors: [name ? null : <NameError />].filter(Boolean) as ReactNode[],

			applicationType,
			currentStepIndex,
			genres,
			media,
			modes,
			name,
			playerPerspectives,
			releases,
			state,
			steps,
			summary,
			themes,
			uploadProgress,
			uploadTotal,

			addGenre,
			addMode,
			addPlayerPerspective,
			addTheme,
			goToStepIndex,
			nextStep,
			previousStep,
			publishGame,
			removeGenre,
			removeMedia,
			removeMode,
			removePlayerPerspective,
			removeTheme,
			saveGameDraft,
			setApplicationType,
			setCurrentStepIndex,
			setName,
			setReleases,
			setSummary,
			updateAllMedia,
			updateMedia,
		}),
		[
			applicationType,
			currentStepIndex,
			genres,
			media,
			modes,
			name,
			playerPerspectives,
			releases,
			state,
			steps,
			summary,
			themes,
			uploadProgress,
			uploadTotal,

			addGenre,
			addMode,
			addPlayerPerspective,
			addTheme,
			goToStepIndex,
			nextStep,
			previousStep,
			publishGame,
			removeGenre,
			removeMedia,
			removeMode,
			removePlayerPerspective,
			removeTheme,
			saveGameDraft,
			setCurrentStepIndex,
			updateAllMedia,
			updateMedia,
		],
	)

	return (
		<DashboardCatalogNewGameContext.Provider value={providerValue}>
			{children}
		</DashboardCatalogNewGameContext.Provider>
	)
}

export const useDashboardCatalogNewGameContext = () =>
	useContext(DashboardCatalogNewGameContext)
