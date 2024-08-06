import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useHttp } from '../api/http.hook'

export type curentObj = {
	curent: number
}

export type editCardType = {
	id: string
	curent: curentObj
}

export type cartItem = {
	id: string
	imageUrl: string
	name: string
	types: string
	sizes: number
	price: number
	rating?: number
	curent: number
}

type initialStateCart = {
	cartElements: cartItem[]
	cartLoadingStatus: string
	cartCurentItems: number
	cartAllSum: number
}

const initialState: initialStateCart = {
	cartElements: [],
	cartLoadingStatus: 'idle',

	cartCurentItems: 0,
	cartAllSum: 0,
}

export const fetchCart = createAsyncThunk('cart/fetchCart', () => {
	const { request } = useHttp()
	return request('http://localhost:3000/cart')
})

export const deleteCart = createAsyncThunk('cart/deleteCart', (id: string) => {
	const { request } = useHttp()
	return request(`http://localhost:3000/cart/${id}`, 'DELETE')
})

export const addCreateCard = createAsyncThunk(
	'cart/createCart',
	(obj: cartItem) => {
		const { request } = useHttp()
		return request(
			`http://localhost:3000/cart`,
			'POST',
			JSON.stringify(obj)
		)
	}
)

export const editCreateCard = createAsyncThunk(
	'cart/editCart',
	({ id, curent }: editCardType | cartItem) => {
		const { request } = useHttp()
		return request(
			`http://localhost:3000/cart/${id}`,
			'PATCH',
			JSON.stringify(curent)
		)
	}
)

const cartSlise = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCart.pending, state => {
				state.cartLoadingStatus = 'loading'
			})
			.addCase(
				fetchCart.fulfilled,
				(state, action: PayloadAction<cartItem[]>) => {
					state.cartLoadingStatus = 'idle'
					state.cartElements = action.payload
					state.cartCurentItems = state.cartElements.reduce(
						(accumulator, item) => {
							return accumulator + item.curent
						},
						0
					)
					state.cartAllSum = state.cartElements.reduce(
						(accumulator, item) => {
							return accumulator + item.price * item.curent
						},
						0
					)
				}
			)
			.addCase(fetchCart.rejected, state => {
				state.cartLoadingStatus = 'error'
			})

			.addCase(deleteCart.fulfilled, (state, action) => {
				state.cartElements = state.cartElements.filter(
					item => item.id !== action.payload
				)
			})

			.addCase(addCreateCard.fulfilled, (state, action) => {
				state.cartElements = [...state.cartElements, action.payload]
			})

			.addCase(editCreateCard.fulfilled, (state, action) => {
				state.cartElements = state.cartElements.map(
					item =>
						(item.id = action.payload.id ? action.payload : item)
				)
			})

			.addDefaultCase(() => {})
	},
})

const { reducer } = cartSlise

export default reducer
