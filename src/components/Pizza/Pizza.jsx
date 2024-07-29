import PizzaCard from '../PizzaCard/PizzaCard'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCreateCard, editCreateCard, fetchCart } from '../../store/CartSlise'
import { fetchPizzas, pizzaSortElements } from '../../store/PizzaSlise'

const Pizza = () => {
	const dispatch = useDispatch()
    
	const cartElement = useSelector(state => state.cart.cartElements)

	useEffect(() => {
		dispatch(fetchPizzas())
		dispatch(fetchCart())

		// eslint-disable-next-line
	}, [])

	const pizzaElement = useSelector(pizzaSortElements)

	const createCard = (obj, id) => {
		if (obj.curent > 1) {
			dispatch(editCreateCard({ id, obj }))
		} else {
			obj.id = id
			dispatch(addCreateCard(obj))
		}
	}

	const pizza = arr => {
		return arr.map(({ id, ...props }) => {
			const param = cartElement.find(e => e.id === id)
			return (
				<PizzaCard
					createCart={newItemCard => createCard(newItemCard, id)}
					key={id}
					{...props}
					curent={param?.curent}
				/>
			)
		})
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
