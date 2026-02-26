// Module imports
import { makeStore } from 'statery'

// Local imports
import { GlobalState } from '@/typedefs/GlobalState'
import { INITIAL_STATE } from '@/store/INITIAL_STATE'
import { initialize } from '@/store/initialize'

export const store = makeStore<GlobalState>(INITIAL_STATE)

if (typeof window !== 'undefined') {
	// @ts-ignore
	window.store = store
}

initialize()
