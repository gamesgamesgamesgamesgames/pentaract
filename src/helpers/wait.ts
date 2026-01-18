export async function wait(waitMS: number = 1000) {
	return new Promise((resolve) => {
		setTimeout(resolve, waitMS)
	})
}
