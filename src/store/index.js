import { configureStore } from "@reduxjs/toolkit";

import pizza from './PizzaSlise'
import filters from './FilterSlise'
import cart from './CartSlise'

const store = configureStore({
    reducer: {pizza, filters, cart},
    middleware: getDefualtMiddleware => getDefualtMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;