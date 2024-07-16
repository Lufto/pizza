import PizzaCard from "../PizzaCard/PizzaCard"

import { fetchPizzas, pizzaSortElements } from "../../store/PizzaSlise"
import { fetchCart } from "../../store/CartSlise"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const Pizza = () => {
    const dispatch = useDispatch()

    // const cartElement = useSelector(state => state.cart.cartElements)

    useEffect(() => {
        dispatch(fetchPizzas())
        dispatch(fetchCart())

        // eslint-disable-next-line
    }, [])

    const pizzaElement = useSelector(pizzaSortElements)

    const createCart = (obj, id) => {
        obj.id = id

        dispatch(createCart(obj))
    }

    // const [currentPizzaCart, setCurrentPizzaCart] = useState(0)
    // const cartElement = useSelector(state => state.cart.cartElements)

    // const currentPizza = (name) => {cartElement.forEach(item => {
    //         if(item.id === name) {
    //             setCurrentPizzaCart(item.curent)
    //         }
    //     })
    // }
    // currentPizza()


    const pizza = (arr) => {
        return arr.map(({id, ...props}) => {
            return (
                <PizzaCard 
                    createCart={(newItemCart) => createCart(newItemCart, id)}
                    key={id}
                    {...props}           
                />
            )
        })
    }


    const elements = pizza(pizzaElement);

    return (        
        <div className="container">
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {elements}
            </div>
        </div>
        
    )
}

export default Pizza