export function convertFileToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => {
			if (typeof reader.result !== 'string') {
				return
			}

			const base64String = reader.result.split(',')[1] // Extract Base64 part
			resolve(base64String)
		}

		reader.onerror = () => reject(new Error('Failed to read file'))

		reader.readAsDataURL(file)
	})
}
