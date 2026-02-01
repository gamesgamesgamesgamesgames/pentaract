'use client'

// Local imports
import { CommaSeparatedList } from '@/components/CommaSeparatedList/CommaSeparatedList'
import {
	DataList,
	DataListLabel,
	DataListValue,
} from '@/components/DataList/DataList'
import { GAME_APPLICATION_TYPES } from '@/constants/GAME_APPLICATION_TYPES'
import { GAME_MODES } from '@/constants/GAME_MODES'
import { GAME_GENRES } from '@/constants/GAME_GENRES'
import { GAME_PLAYER_PERSPECTIVES } from '@/constants/GAME_PLAYER_PERSPECTIVES'
import { GAME_THEMES } from '@/constants/GAME_THEMES'
import { useDashboardCatalogGameContext } from '@/context/DashboardCatalogGameContext/DashboardCatalogGameContext'

export function DashboardCatalogGameOverview() {
	const { game } = useDashboardCatalogGameContext()

	const gameRecord = game?.record!

	return (
		<div className={'flex flex-col'}>
			<div>{gameRecord.name}</div>

			<div>{gameRecord.summary}</div>

			<DataList>
				<DataListLabel>{'Name'}</DataListLabel>
				<DataListValue>{gameRecord.name}</DataListValue>

				<DataListLabel>{'Summary'}</DataListLabel>
				<DataListValue>
					{gameRecord.summary || (
						<span className={'italic text-muted-foreground'}>
							{'No summary provided.'}
						</span>
					)}
				</DataListValue>

				<DataListLabel>{'Type'}</DataListLabel>
				<DataListValue>
					{gameRecord.applicationType
						? GAME_APPLICATION_TYPES[gameRecord.applicationType].name
						: ''}
				</DataListValue>

				<DataListLabel>{'Genres'}</DataListLabel>
				<DataListValue>
					{gameRecord.genres?.length ? (
						<CommaSeparatedList
							includeLinks
							items={gameRecord.genres.map((genre) => GAME_GENRES[genre]!.name)}
						/>
					) : (
						<span className={'italic text-muted-foreground'}>
							{'No genres provided'}
						</span>
					)}
				</DataListValue>

				<DataListLabel>{'Themes'}</DataListLabel>
				<DataListValue>
					{gameRecord.themes?.length ? (
						<CommaSeparatedList
							includeLinks
							items={gameRecord.themes.map((theme) => GAME_THEMES[theme]!.name)}
						/>
					) : (
						<span className={'italic text-muted-foreground'}>
							{'No themes provided'}
						</span>
					)}
				</DataListValue>

				<DataListLabel>{'Player Perspectives'}</DataListLabel>
				<DataListValue>
					{gameRecord.playerPerspectives?.length ? (
						<CommaSeparatedList
							includeLinks
							items={gameRecord.playerPerspectives.map(
								(playerPerspective) =>
									GAME_PLAYER_PERSPECTIVES[playerPerspective]!.name,
							)}
						/>
					) : (
						<span className={'italic text-muted-foreground'}>
							{'No player perspectives provided'}
						</span>
					)}
				</DataListValue>

				<DataListLabel>{'Modes'}</DataListLabel>
				<DataListValue>
					{gameRecord.modes?.length ? (
						<CommaSeparatedList
							includeLinks
							items={gameRecord.modes.map((mode) => GAME_MODES[mode]!.name)}
						/>
					) : (
						<span className={'italic text-muted-foreground'}>
							{'No modes provided'}
						</span>
					)}
				</DataListValue>
			</DataList>
		</div>
	)
}
