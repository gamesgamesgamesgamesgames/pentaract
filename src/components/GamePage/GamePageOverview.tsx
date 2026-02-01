// Module imports
import Link from 'next/link'

// Local imports
import { GAME_GENRES } from '@/constants/GAME_GENRES'
import { GAME_MODES } from '@/constants/GAME_MODES'
import { GAME_PLAYER_PERSPECTIVES } from '@/constants/GAME_PLAYER_PERSPECTIVES'
import { GAME_THEMES } from '@/constants/GAME_THEMES'
import { type GameRecord } from '@/typedefs/GameRecord'
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item'
import { TabsContent } from '@/components/ui/tabs'

// Types
type Props = Readonly<{
	gameRecord: GameRecord
}>

export async function GamePageOverview(props: Props) {
	const { gameRecord } = props

	return (
		<TabsContent value={'overview'}>
			<div className={'gap-4 grid grid-cols-6 items-start'}>
				<Item>
					<ItemContent>
						<ItemTitle>{'Genres'}</ItemTitle>
						<ul className={'text-muted-foreground'}>
							{Boolean(gameRecord.genres) &&
								gameRecord.genres!.map((genre) => (
									<li key={genre}>
										<Link href={`/genre/${GAME_GENRES[genre].id}`}>
											{GAME_GENRES[genre].name}
										</Link>
									</li>
								))}
						</ul>
					</ItemContent>
				</Item>

				<Item>
					<ItemContent>
						<ItemTitle>{'Themes'}</ItemTitle>
						<ul className={'text-muted-foreground'}>
							{Boolean(gameRecord.themes) &&
								gameRecord.themes!.map((theme) => (
									<li key={theme}>
										<Link href={`/theme/${GAME_THEMES[theme].id}`}>
											{GAME_THEMES[theme].name}
										</Link>
									</li>
								))}
						</ul>
					</ItemContent>
				</Item>

				<Item>
					<ItemContent>
						<ItemTitle>{'Game Modes'}</ItemTitle>
						<ul className={'text-muted-foreground'}>
							{Boolean(gameRecord.modes) &&
								gameRecord.modes!.map((mode) => (
									<li key={mode}>
										<Link href={`/mode/${GAME_MODES[mode].id}`}>
											{GAME_MODES[mode].name}
										</Link>
									</li>
								))}
						</ul>
					</ItemContent>
				</Item>

				<Item>
					<ItemContent>
						<ItemTitle>{'Player Perspectives'}</ItemTitle>
						<ul className={'text-muted-foreground'}>
							{Boolean(gameRecord.playerPerspectives) &&
								gameRecord.playerPerspectives!.map((playerPerspective) => (
									<li key={playerPerspective}>
										<Link
											href={`/playerPerspective/${GAME_PLAYER_PERSPECTIVES[playerPerspective].id}`}>
											{GAME_PLAYER_PERSPECTIVES[playerPerspective].name}
										</Link>
									</li>
								))}
						</ul>
					</ItemContent>
				</Item>
			</div>
		</TabsContent>
	)
}
