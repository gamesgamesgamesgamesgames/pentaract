import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,

	async redirects() {
		return [
			{
				source: '/dashboard/catalog/:did/:rkey',
				destination: '/dashboard/catalog/:did/:rkey/overview',
				permanent: false,
			},
		]
	},
}

export default nextConfig
