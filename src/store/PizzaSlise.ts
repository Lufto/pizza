import {
	createAsyncThunk,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { useHttp } from '../api/http.hook'

export type pizzaElementsType = {
	id: string
	imageUrl: string
	name: string
	types: string[]
	sizes: number[]
	price: number
	category: string
	rating: number
}

type initialStateElements = {
	pizzaElements: pizzaElementsType[]
	pizzaLoadingStatus: string
}

const initialState: initialStateElements = {
	pizzaElements: [],
	pizzaLoadingStatus: 'idle',
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', () => {
	const { request } = useHttp()
	return request('http://localhost:3000/pizzas')
})

const pizzaSlise = createSlice({
	name: 'pizza',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.pizzaLoadingStatus = 'loading'
			})
			.addCase(
				fetchPizzas.fulfilled,
				(state, action: PayloadAction<pizzaElementsType[]>) => {
					state.pizzaLoadingStatus = 'idle'
					state.pizzaElements = action.payload
				}
			)
			.addCase(fetchPizzas.rejected, state => {
				state.pizzaLoadingStatus = 'error'
			})
			.addDefaultCase(() => {})
	},
})

export const pizzaSortElements = createSelector(
	state => state.filters.activeCategoryes,
	state => state.pizza.pizzaElements,
	state => state.filters.activeSort,
	(filter, pizza, sort) => {
		const copyPizza = [...pizza]

		const sortPizza = () => {
			if (sort === 'популярности') {
				return copyPizza.sort((a, b) => a.rating - b.rating)
			} else if (sort === 'цене') {
				return copyPizza.sort((a, b) => a.price - b.price)
			} else if (sort === 'алфавиту') {
				return copyPizza.sort((a, b) => a.name - b.name)
			}
		}

		if (filter === 'Все') {
			return sortPizza()
		}

		return sortPizza()?.filter(item => item.category === filter)
	}
)

const { reducer } = pizzaSlise

export default reducer
