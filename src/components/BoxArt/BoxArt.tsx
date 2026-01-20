'use client'

// Module imports
import { AspectRatio, Box, Card, Inset, Skeleton, Text } from '@radix-ui/themes'
import { motion } from 'motion/react'

// Local imports
import { Game } from '@/typedefs/Game'
import { Link } from '@/components/Link/Link'
import { parseATURI } from '@/helpers/parseATURI'
import { useMemo } from 'react'

// Types
type Props = {
	game?: Game
	width?: number
}

export function BoxArt(props: Props) {
	const { game, width = 'auto' } = props

	const { did, rkey } = useMemo(() => {
		if (game) {
			return parseATURI(game.record.uri)
		}

		return {
			did: null,
			collection: null,
			rkey: null,
		}
	}, [game])

	const internalElements = useMemo(() => {
		let result = (
			<>
				<Inset
					clip={'padding-box'}
					side={'top'}>
					<Skeleton loading={!game}>
						<AspectRatio ratio={3 / 4}>
							<img
								src={'https://placehold.co/300x400'}
								style={{
									height: '100%',
									objectFit: 'cover',
									width: '100%',
								}}
							/>
						</AspectRatio>
					</Skeleton>
				</Inset>

				<Box pt={'3'}>
					<Skeleton loading={!game}>
						<Text>{game?.record.name ?? 'Game name'}</Text>
					</Skeleton>
				</Box>
			</>
		)

		if (game && did && rkey) {
			result = (
				<Link
					href={`/dashboard/catalog/${did}/${rkey}/overview`}
					underline={'none'}>
					{result}
				</Link>
			)
		}

		return result
	}, [game])

	return (
		<Card asChild>
			<motion.div
				transition={{ duration: 0.1 }}
				style={{
					width,
					willChange: 'scale',
				}}
				whileHover={{ scale: 1.05 }}>
				{internalElements}
			</motion.div>
		</Card>
	)
}
