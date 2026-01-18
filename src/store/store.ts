// Module imports
import { createQuicksliceClient } from 'quickslice-client-js'
import { makeStore } from 'statery'

// Local imports
import { GlobalState } from '@/typedefs/GlobalState'
import { INITIAL_STATE } from '@/store/INITIAL_STATE'
import { initialize } from '@/store/initialize'

export const store = makeStore<GlobalState>(INITIAL_STATE)

initialize()
