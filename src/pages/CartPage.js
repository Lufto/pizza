import { useDispatch, useSelector } from "react-redux";

import Cart from "../components/Cart/Cart";
import CartEmpty from "../components/CartEmpty/CartEmpty";
import { useEffect } from "react";
import { fetchCart } from "../store/CartSlise";

const CartPage = () => {

    const itemCart = useSelector(state => state.cart.cartCurentItems)
    const cartElement = useSelector(state => state.cart.cartElements)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCart())
        
        // eslint-disable-next-line
    }, [])

    if(itemCart === 0) {
        return (
            <CartEmpty/>
        )
    } else {
        return (
            <Cart cartElement={cartElement}/>
        )
    }
}

export default CartPage