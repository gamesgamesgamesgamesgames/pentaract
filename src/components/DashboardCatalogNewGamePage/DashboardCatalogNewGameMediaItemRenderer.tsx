// Module imports
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useMemo, useRef, useState } from 'react'

// Local imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	DataList,
	DataListLabel,
	DataListValue,
} from '@/components/DataList/DataList'
import { Field, FieldLabel } from '@/components/ui/field'
import {
	FileUploadItem,
	FileUploadItemDelete,
} from '@/components/ui/file-upload'
import { formatBytes } from '@/helpers/formatBytes'
import { Input } from '@/components/ui/input'
import { Item, ItemContent, ItemHeader } from '@/components/ui/item'
import {
	MediaPlayer,
	MediaPlayerVideo,
	MediaPlayerLoading,
	MediaPlayerError,
	MediaPlayerVolumeIndicator,
	MediaPlayerControls,
	MediaPlayerControlsOverlay,
	MediaPlayerPlay,
	MediaPlayerVolume,
	MediaPlayerSeek,
	MediaPlayerTime,
} from '@/components/ui/media-player'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Types
type ItemRendererProps = Readonly<{
	file: File
}>

export function DashboardCatalogNewGameMediaItemRenderer(
	props: ItemRendererProps,
) {
	const { file } = props

	console.log(file)

	const imageElementRef = useRef<HTMLImageElement>(null)
	const videoElementRef = useRef<HTMLVideoElement>(null)

	const [dimensions, setDimensions] = useState<null | {
		height: number
		width: number
	}>(null)

	const url = useMemo(() => URL.createObjectURL(file), [file])

	const keyPrefix = file.name.replace(' ', '-')

	useEffect(() => {
		const imageElement = imageElementRef.current
		const videoElement = videoElementRef.current

		if (!dimensions) {
			if (imageElement) {
				imageElement.onload = () => {
					setDimensions({
						height: imageElement.naturalHeight,
						width: imageElement.naturalWidth,
					})
				}
			} else if (videoElement) {
				videoElement.addEventListener('loadedmetadata', () => {
					setDimensions({
						height: videoElement.videoHeight,
						width: videoElement.videoWidth,
					})
				})
			}
		}
	}, [dimensions])

	return (
		<FileUploadItem
			className={'border-none p-0'}
			value={file}>
			<Card className={'p-4 size-full'}>
				<div className={'flex gap-4'}>
					<Item
						className={'shrink-0 w-xs'}
						variant={'outline'}>
						<ItemHeader>
							{file.type.startsWith('video/') && (
								<MediaPlayer
									className={'object-contain rounded-none size-full'}>
									<MediaPlayerVideo ref={videoElementRef}>
										<source
											src={url}
											type={file.type}
										/>
									</MediaPlayerVideo>
									<MediaPlayerLoading />
									<MediaPlayerError />
									<MediaPlayerVolumeIndicator />

									<MediaPlayerControls className={'flex-col items-start gap-2'}>
										<MediaPlayerControlsOverlay />

										<div className={'flex w-full items-center gap-2'}>
											<div className='flex flex-1 items-center gap-2'>
												<MediaPlayerPlay />
												<MediaPlayerVolume expandable />
											</div>

											<div className={'flex items-center gap-2'}>
												<MediaPlayerTime />
											</div>
										</div>
										<MediaPlayerSeek />
									</MediaPlayerControls>
								</MediaPlayer>
							)}

							{file.type.startsWith('image/') && (
								<img
									alt={file.name}
									className={'object-contain size-full'}
									ref={imageElementRef}
									src={url}
								/>
							)}
						</ItemHeader>

						<ItemContent>
							<DataList>
								<DataListLabel>{'Filename'}</DataListLabel>
								<DataListValue>{file.name}</DataListValue>

								<DataListLabel>{'Dimensions'}</DataListLabel>
								<DataListValue>{`${dimensions?.width} × ${dimensions?.height}`}</DataListValue>

								<DataListLabel>{'Size'}</DataListLabel>
								<DataListValue>{formatBytes(file.size)}</DataListValue>
							</DataList>
						</ItemContent>
					</Item>

					<div className={'flex flex-col gap-4 w-full'}>
						<Field>
							<FieldLabel htmlFor={`${keyPrefix}-title`}>{'Title'}</FieldLabel>
							<Input
								autoComplete={'off'}
								// disabled={disabled}
								id={`${keyPrefix}-title`}
								// onChange={onChange}
								required
								type={'text'}
								// value={value}
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor={`${keyPrefix}-description`}>
								{'Description'}
							</FieldLabel>
							<Textarea
								autoComplete={'off'}
								// disabled={disabled}
								id={`${keyPrefix}-description`}
								// onChange={onChange}
								required
								// value={value}
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor={`${keyPrefix}-description`}>
								{'Media Type'}
							</FieldLabel>
							<Select
							// disabled={disabled}
							// onValueChange={onChange}
							// value={value}
							>
								<SelectTrigger>
									<SelectValue placeholder={'Select a media type'} />
								</SelectTrigger>

								<SelectContent>
									{file.type.startsWith('video/') && (
										<>
											<SelectItem value={'trailer'}>{'Trailer'}</SelectItem>

											<SelectSeparator />

											<SelectGroup>
												<SelectLabel>{'Trailers'}</SelectLabel>
												<SelectItem value={'announcementTrailer'}>
													{'Announcement Trailer'}
												</SelectItem>
												<SelectItem value={'releaseDateTrailer'}>
													{'Release Date Trailer'}
												</SelectItem>
												<SelectItem value={'cinematicTrailer'}>
													{'Cinematic Trailer'}
												</SelectItem>
												<SelectItem value={'gameplayTrailer'}>
													{'Gameplay Trailer'}
												</SelectItem>
												<SelectItem value={'accoladesTrailer'}>
													{'Accolades Trailer'}
												</SelectItem>
												<SelectItem value={'launchTrailer'}>
													{'Launch Trailer'}
												</SelectItem>
											</SelectGroup>

											<SelectGroup>
												<SelectLabel>{'Other'}</SelectLabel>
												<SelectItem value={'teaser'}>{'Teaser'}</SelectItem>
												<SelectItem value={'gameplay'}>
													{'Gameplay Footage'}
												</SelectItem>
												<SelectItem value={'devDiary'}>
													{'Dev Diary'}
												</SelectItem>
												<SelectItem value={'intro'}>{'Game Intro'}</SelectItem>
												<SelectItem value={'cutscene'}>{'Cutscene'}</SelectItem>
											</SelectGroup>
										</>
									)}

									{file.type.startsWith('image/') && (
										<>
											<SelectItem value={'screenshot'}>
												{'Screenshot'}
											</SelectItem>

											<SelectSeparator />

											<SelectGroup>
												<SelectLabel>{'Logos'}</SelectLabel>
												<SelectItem value={'logoColor'}>
													{'Game Logo (color)'}
												</SelectItem>
												<SelectItem value={'logoBlack'}>
													{'Game Logo (black)'}
												</SelectItem>
												<SelectItem value={'logoWhite'}>
													{'Game Logo (white)'}
												</SelectItem>
											</SelectGroup>

											<SelectSeparator />

											<SelectGroup>
												<SelectLabel>{'Arwork'}</SelectLabel>
												<SelectItem value={'keyArt'}>{'Key Art'}</SelectItem>
												<SelectItem value={'keyArtLogo'}>
													{'Key Art (with logo)'}
												</SelectItem>
												<SelectItem value={'conceptArt'}>
													{'Concept Art'}
												</SelectItem>
											</SelectGroup>
										</>
									)}
								</SelectContent>
							</Select>
						</Field>

						<div>
							<FileUploadItemDelete asChild>
								<Button
									variant={'ghost'}
									size={'icon'}
									className={'size-7'}>
									<FontAwesomeIcon icon={faTimes} />
								</Button>
							</FileUploadItemDelete>
						</div>
					</div>
				</div>
			</Card>
		</FileUploadItem>
	)
}
