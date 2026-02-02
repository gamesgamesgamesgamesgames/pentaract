// Module import
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Local import
import { Button } from '@/components/ui/button'
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadList,
	FileUploadProps,
	FileUploadTrigger,
} from '@/components/ui/file-upload'
import { DashboardCatalogNewGameMediaItemRenderer } from '@/components/DashboardCatalogNewGamePage/DashboardCatalogNewGameMediaItemRenderer'
import { Scroller } from '@/components/ui/scroller'
import { toast } from 'sonner'
import { useCallback, useState } from 'react'

export function DashboardCatalogNewGameMedia() {
	const [files, setFiles] = useState<File[]>([])

	const onUpload: NonNullable<FileUploadProps['onUpload']> = useCallback(
		async (files, { onProgress, onSuccess, onError }) => {
			try {
				// Process each file individually
				const uploadPromises = files.map(async (file) => {
					try {
						// Simulate file upload with progress
						const totalChunks = 10
						let uploadedChunks = 0

						// Simulate chunk upload with delays
						for (let i = 0; i < totalChunks; i++) {
							// Simulate network delay (100-300ms per chunk)
							await new Promise((resolve) =>
								setTimeout(resolve, Math.random() * 200 + 100),
							)

							// Update progress for this specific file
							uploadedChunks++
							const progress = (uploadedChunks / totalChunks) * 100
							onProgress(file, progress)
						}

						// Simulate server processing delay
						await new Promise((resolve) => setTimeout(resolve, 500))
						onSuccess(file)
					} catch (error) {
						onError(
							file,
							error instanceof Error ? error : new Error('Upload failed'),
						)
					}
				})

				// Wait for all uploads to complete
				await Promise.all(uploadPromises)
			} catch (error) {
				// This handles any error that might occur outside the individual upload processes
				console.error('Unexpected error during upload:', error)
			}
		},
		[],
	)

	const onFileReject = useCallback((file: File, message: string) => {
		toast(message, {
			description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
		})
	}, [])

	return (
		<FileUpload
			className={
				'flex flex-col grow justify-stretch overflow-hidden shrink w-full'
			}
			maxSize={5 * 1024 * 1024}
			multiple
			onFileReject={onFileReject}
			onUpload={onUpload}
			onValueChange={setFiles}
			value={files}>
			<FileUploadDropzone>
				<div className={'flex flex-col items-center gap-1 text-center'}>
					<div
						className={
							'flex items-center justify-center rounded-full border p-2.5'
						}>
						<FontAwesomeIcon
							className={'text-muted-foreground'}
							icon={faUpload}
							size={'lg'}
						/>
					</div>
					<p className={'font-medium text-sm'}>{'Drag & drop files here'}</p>
					<p className={'text-muted-foreground text-xs'}>
						{'Or click to browse (up to 5MB each)'}
					</p>
				</div>
				<FileUploadTrigger asChild>
					<Button
						variant={'outline'}
						size={'sm'}
						className={'mt-2 w-fit'}>
						{'Browse files'}
					</Button>
				</FileUploadTrigger>
			</FileUploadDropzone>

			<Scroller>
				<FileUploadList>
					{files.map((file, index) => (
						<DashboardCatalogNewGameMediaItemRenderer
							key={index}
							file={file}
						/>
					))}
				</FileUploadList>
			</Scroller>
		</FileUpload>
	)
}
