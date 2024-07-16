import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../api/http.hook";

const initialState = {
    pizzaElements: [],
    pizzaLoadingStatus: 'idle',

}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3000/pizzas")
    }
)

const pizzaSlise = createSlice({
    name: 'pizza',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, state => {state.pizzaLoadingStatus = 'loading'})
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzaLoadingStatus = 'idle';
                state.pizzaElements = action.payload
            })
            .addCase(fetchPizzas.rejected, state => {state.pizza.pizzaLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

export const pizzaSortElements = createSelector(
    (state) => state.filters.activeCategoryes,
    (state) => state.pizza.pizzaElements,
    (state) => state.filters.activeSort,
    (filter, pizza, sort) => {
        const copyPizza = [...pizza]

        const sortPizza = () => {
            if(sort === 'популярности') {
                return copyPizza.sort((a, b) => a.rating - b.rating);
            } else if (sort === 'цене') {
                return copyPizza.sort((a, b) => a.price - b.price);
            } else if (sort === 'алфавиту') {
                return copyPizza.sort((a, b) => a.name - b.name);
            }
        }
        
        if (filter === 'Все') {
            return sortPizza();
        } else {
            return sortPizza().filter(item => item.category === filter);
        }
    }
)

const {actions, reducer} = pizzaSlise;

export default reducer