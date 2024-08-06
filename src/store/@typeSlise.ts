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

export type initialStateCart = {
	cartElements: cartItem[]
	cartLoadingStatus: string
	cartCurentItems: number
	cartAllSum: number
}

export type FiltersType = {
	id: string
	name: string
}

export type initialStateFilter = {
	categoryesFilters: FiltersType[]
	sortFilters: FiltersType[]
	activeCategoryes: string
	activeSort: string
}

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

export type initialStateElements = {
	pizzaElements: pizzaElementsType[]
	pizzaLoadingStatus: string
}