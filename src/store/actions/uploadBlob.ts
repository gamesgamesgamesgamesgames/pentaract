// Local imports
import { type Cid } from '@atproto/lex'
import { convertFileToBase64 } from '@/helpers/convertFileToBase64'
import { store } from '@/store/store'

export async function uploadBlob(file: File) {
	const { quicksliceClient } = store.state

	if (!quicksliceClient) {
		throw new Error('Cannot list games before logging in.')
	}

	const base64Data = await convertFileToBase64(file)

	const result = await quicksliceClient.mutate<{
		uploadBlob: {
			ref: Cid
			mimeType: string
			size: number
		}
	}>(
		`
    mutation UploadImage (
      $data: String!
      $mimeType: String!
    ) {
      uploadBlob(
        data: $data
        mimeType: $mimeType
      ) {
        ref
        mimeType
        size
      }
    }
    `,
		{
			data: base64Data,
			mimeType: file.type,
		},
	)

	return result.uploadBlob
}
