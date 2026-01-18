'use client'

// Module imports
import { Box, Button, Flex, Grid, Heading, Separator } from '@radix-ui/themes'
import { useEffect, useMemo } from 'react'
import { useStore } from 'statery'

// Local imports
import { BoxArt } from '@/components/BoxArt/BoxArt'
import { DashboardMainWrapper } from '@/components/DashboardMainWrapper/DashboardMainWrapper'
import { listGames } from '@/store/actions/listGames'
import { NewGameDialog } from '@/components/NewGameDialog/NewGameDialog'
import { store } from '@/store/store'

// Constants
const NULL_GAMES = Array(20).fill(null)

export function DashboardCatalog() {
	const { gamesCatalog, gamesCatalogState } = useStore(store)

	const gamesElements = useMemo(() => {
		if (gamesCatalog === null) {
			return (
				<Grid
					columns={'5'}
					gap={'6'}>
					{NULL_GAMES.map((_, index) => (
						<BoxArt key={index} />
					))}
				</Grid>
			)
		}

		if (!gamesCatalog.length) {
			return (
				<Flex
					align={'center'}
					height={'100%'}
					justify={'center'}>
					{'No games found.'}
				</Flex>
			)
		}

		return (
			<Grid
				columns={'5'}
				gap={'6'}>
				{gamesCatalog.map((game, index) => (
					<BoxArt
						key={index}
						game={game}
					/>
				))}
			</Grid>
		)
	}, [gamesCatalog, gamesCatalogState])

	useEffect(() => {
		if (gamesCatalog === null && gamesCatalogState === 'idle') {
			listGames()
		}
	}, [gamesCatalog, gamesCatalogState])

	return (
		<DashboardMainWrapper>
			<Flex justify={'between'}>
				<Heading as={'h2'}>{'Games'}</Heading>

				<NewGameDialog trigger={<Button>{'Add Game'}</Button>} />
			</Flex>

			<Box py={'4'}>
				<Separator size={'4'} />
			</Box>

			{gamesElements}
		</DashboardMainWrapper>
	)
}
