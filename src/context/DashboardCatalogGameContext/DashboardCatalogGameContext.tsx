// Moduile imports
import { type AtUriString } from '@atproto/lex'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type PropsWithChildren,
} from 'react'
import { useStore } from 'statery'

// Local imports
import { type DID } from '@/typedefs/DID'
import { type Game } from '@/typedefs/Game'
import { getGame } from '@/store/actions/getGame'
import { listGames } from '@/store/actions/listGames'
import { useParams } from 'next/navigation'
import { type State } from '@/typedefs/State'
import { store } from '@/store/store'

type Props = PropsWithChildren

export const DashboardCatalogGameContext = createContext<{
	game: null | Game
	state: State
}>({
	game: null,
	state: 'idle',
})

export function DashboardCatalogGameContextProvider(props: Props) {
	const { children } = props

	const params = useParams<{
		did: DID
		rkey: string
	}>()

	const did = decodeURIComponent(params.did)
	const rkey = decodeURIComponent(params.rkey)
	const gameURI: AtUriString = `at://${did}/games.gamesgamesgamesgames.game/${rkey}`

	const { gamesCatalog, user } = useStore(store)

	const [state, setState] = useState<State>('idle')
	const [game, setGame] = useState<null | Game>(
		gamesCatalog?.find((catalogGame) => catalogGame.record.uri === gameURI) ??
			null,
	)

	const handleGameLoaded = useCallback((gameData?: Game) => {
		if (gameData) {
			setGame(gameData)
			setState('idle')
		} else {
			setState('error')
		}
	}, [])

	const providerValue = useMemo(
		() => ({
			game,
			state,
		}),
		[game],
	)

	useEffect(() => {
		if (user && !game?.isHydrated && state === 'idle') {
			setState('active')

			if (!gamesCatalog) {
				listGames()
					.then(() => getGame(gameURI))
					.then(handleGameLoaded)
			} else {
				getGame(gameURI).then(handleGameLoaded)
			}
		}
	}, [gameURI, handleGameLoaded, state, user])

	return (
		<DashboardCatalogGameContext.Provider value={providerValue}>
			{children}
		</DashboardCatalogGameContext.Provider>
	)
}

export const useDashboardCatalogGameContext = () =>
	useContext(DashboardCatalogGameContext)
