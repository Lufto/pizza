import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../api/http.hook";

const initialState = {
    cartElements: [],
    cartLoadingStatus: 'idle',

    cartCurentItems: 0,
    cartAllSum: 0
}

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3000/cart")
    }
)

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    (id) => {
        const {request} = useHttp();
        return request(`http://localhost:3000/cart/${id}`, "DELETE")
    }
)

export const deleteCarts = createAsyncThunk(
    'cart/deleteCarts',
    () => {
        const {request} = useHttp();
        return request(`http://localhost:3000/cart/`, "DELETE")
    }
)

export const createCart = createAsyncThunk(
    'cart/createCart',
    () => {
        const {request} = useHttp();
        return request(`http://localhost:3000/cart`, "POST")
    }
)

const cartSlise = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, state => {state.cartLoadingStatus = 'loading'})
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartLoadingStatus = 'idle';
                state.cartElements = action.payload;
                state.cartCurentItems = state.cartElements.length;
                // state.cartAllSum = () => {
                //     let sum = 0
                //     state.cartElements.forEach(item => sum += item.price)
                //     return sum
                // }
            })
            .addCase(fetchCart.rejected, state => {state.pizza.cartLoadingStatus = 'error'})


            
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.cartElements = state.cartElements.filter(item => item.id !== action.payload);
            })

            .addCase(deleteCarts.fulfilled, (state) => {
                state.cartElements = [];
                state.cartCurentItems = 0;
                state.cartAllSum = 0;
            })

            .addCase(createCart.fulfilled, (state, action) => {
                state.cartElements = state.cartElements.push[action.payload];
            })

            .addDefaultCase(() => {})
    }
})

const {reducer} = cartSlise;


export default reducer