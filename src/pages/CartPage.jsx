import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import Cart from '../components/Cart/Cart'
import CartEmpty from '../components/CartEmpty/CartEmpty'
import { fetchCart } from '../store/CartSlise'

const CartPage = () => {
	const itemCart = useSelector(state => state.cart.cartCurentItems)
	const cartElement = useSelector(state => state.cart.cartElements)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCart())
	})

	if (itemCart === 0) {
		return <CartEmpty />
	} else {
		return <Cart cartElement={cartElement} />
	}
}

export default CartPage
