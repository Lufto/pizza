import PizzaCard from '../PizzaCard/PizzaCard'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { cartItem, curentObj, pizzaElementsType } from '../../store/@typeSlise'
import {
	addCreateCard,
	editCreateCard,
	fetchCart,
} from '../../store/CartSlise'
import {
	fetchPizzas,
	pizzaSortElements,
} from '../../store/PizzaSlise'

const Pizza = () => {
	const dispatch = useAppDispatch()

	const cartElement = useAppSelector(state => state.cart.cartElements)

	useEffect(() => {
		dispatch(fetchPizzas())
		dispatch(fetchCart())

		// eslint-disable-next-line
	}, [])

	const pizzaElement = useAppSelector(pizzaSortElements)

	const createCard = (obj: cartItem, id: string, curent: curentObj) => {
		if (obj.curent > 1 && curent) {
			dispatch(editCreateCard({ id, curent }))
		} else {
			obj.id = id
			dispatch(addCreateCard(obj))
		}
	}

	const pizza = (arr?: pizzaElementsType[]) => {
		if (arr) {
			return arr.map(({ id, ...props }) => {
				const param = cartElement.find(e => e.id === id)
				return (
					<PizzaCard
						createCard={(
							newItemCard: cartItem,
							curent: curentObj
						) => createCard(newItemCard, id, curent)}
						key={id}
						{...props}
						id={id}
						curent={param?.curent}
					/>
				)
			})
		}
		return 'Пицц нет'
	}

	const elements = pizza(pizzaElement)

	return (
		<div className="container">
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{elements}</div>
		</div>
	)
}

export default Pizza
