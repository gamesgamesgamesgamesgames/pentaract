'use client'

// Module imports
import { type CSSProperties, type PropsWithChildren } from 'react'

// Local imports
import { DashboardNavigation } from '@/components/DashboardNavigation/DashboardNavigation'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

// Types
type Props = Readonly<PropsWithChildren>

export function DashboardLayout(props: Props) {
	const { children } = props

	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 72)',
					'--header-height': 'calc(var(--spacing) * 12)',
				} as CSSProperties
			}>
			<DashboardNavigation />

			<SidebarInset
				className={'h-(--main-height) justify-stretch overflow-hidden'}>
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
