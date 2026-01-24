'use client'

// Module imports
import { DataList, Flex, Text } from '@radix-ui/themes'

// Local imports
import { CommaSeparatedList } from '../CommaSeparatedList/CommaSeparatedList'
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
		<Flex direction={'column'}>
			<Text>{gameRecord.name}</Text>

			<Text>{gameRecord.summary}</Text>

			<DataList.Root>
				<DataList.Item>
					<DataList.Label>{'Name'}</DataList.Label>
					<DataList.Value>{gameRecord.name}</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label>{'Summary'}</DataList.Label>
					<DataList.Value>
						{gameRecord.summary || (
							<Text
								color={'gold'}
								style={{ fontStyle: 'italic' }}>
								{'No summary provided.'}
							</Text>
						)}
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label>{'Type'}</DataList.Label>
					<DataList.Value>
						{gameRecord.applicationType
							? GAME_APPLICATION_TYPES[gameRecord.applicationType].name
							: ''}
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label>{'Genres'}</DataList.Label>
					<DataList.Value>
						{gameRecord.genres?.length ? (
							<CommaSeparatedList
								includeLinks
								items={gameRecord.genres.map(
									(genre) => GAME_GENRES[genre]!.name,
								)}
							/>
						) : (
							<Text
								color={'gold'}
								style={{ fontStyle: 'italic' }}>
								{'No genres provided'}
							</Text>
						)}
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label>{'Themes'}</DataList.Label>
					<DataList.Value>
						{gameRecord.themes?.length ? (
							<CommaSeparatedList
								includeLinks
								items={gameRecord.themes.map(
									(theme) => GAME_THEMES[theme]!.name,
								)}
							/>
						) : (
							<Text
								color={'gold'}
								style={{ fontStyle: 'italic' }}>
								{'No themes provided'}
							</Text>
						)}
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label>{'Player Perspectives'}</DataList.Label>
					<DataList.Value>
						{gameRecord.playerPerspectives?.length ? (
							<CommaSeparatedList
								includeLinks
								items={gameRecord.playerPerspectives.map(
									(playerPerspective) =>
										GAME_PLAYER_PERSPECTIVES[playerPerspective]!.name,
								)}
							/>
						) : (
							<Text
								color={'gold'}
								style={{ fontStyle: 'italic' }}>
								{'No player perspectives provided'}
							</Text>
						)}
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label>{'Modes'}</DataList.Label>
					<DataList.Value>
						{gameRecord.modes?.length ? (
							<CommaSeparatedList
								includeLinks
								items={gameRecord.modes.map((mode) => GAME_MODES[mode]!.name)}
							/>
						) : (
							<Text
								color={'gold'}
								style={{ fontStyle: 'italic' }}>
								{'No modes provided'}
							</Text>
						)}
					</DataList.Value>
				</DataList.Item>
			</DataList.Root>
		</Flex>
	)
}
