import { useEffect } from 'react'
import Cart from '../components/Cart/Cart'
import CartEmpty from '../components/CartEmpty/CartEmpty'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchCart } from '../store/CartSlise'

const CartPage = () => {
	const itemCart = useAppSelector(state => state.cart.cartCurentItems)
	const cartElement = useAppSelector(state => state.cart.cartElements)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCart())

		// eslint-disable-next-line
	}, [])

	if (itemCart === 0) {
		return <CartEmpty />
	} else {
		return <Cart cartElement={cartElement} />
	}
}

export default CartPage
