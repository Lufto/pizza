import { configureStore } from '@reduxjs/toolkit'

import { useDispatch, useSelector } from 'react-redux'
import cart from './CartSlise.ts'
import filters from './FilterSlise.ts'
import pizza from './PizzaSlise.ts'

const store = configureStore({
	reducer: { pizza, filters, cart },
	middleware: getDefualtMiddleware => getDefualtMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
