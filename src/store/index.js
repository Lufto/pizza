import { configureStore } from '@reduxjs/toolkit'

import cart from './CartSlise'
import filters from './FilterSlise'
import pizza from './PizzaSlise'

const store = configureStore({
	reducer: { pizza, filters, cart },
	middleware: getDefualtMiddleware => getDefualtMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
