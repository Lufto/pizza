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

export const addCreateCard = createAsyncThunk(
    'cart/createCart',
    (obj) => {
        const {request} = useHttp();
        return request(`http://localhost:3000/cart`, "POST", JSON.stringify(obj))
    }
)

export const editCreateCard = createAsyncThunk(
    'cart/editCart',
    ({id, obj}) => {
        const {request} = useHttp();
        return request(`http://localhost:3000/cart/${id}`, "PATCH", JSON.stringify(obj))
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
                state.cartCurentItems = state.cartElements.reduce((accumulator, item) => accumulator + item.curent, 0);
                state.cartAllSum = state.cartElements.reduce((accumulator, item) => accumulator + item.price * item.curent, 0)
            })
            .addCase(fetchCart.rejected, state => {state.pizza.cartLoadingStatus = 'error'})

            .addCase(deleteCart.fulfilled, (state, action) => {
                state.cartElements = state.cartElements.filter(item => item.id !== action.payload);
            })

            .addCase(addCreateCard.fulfilled, (state, action) => {
                state.cartElements = [...state.cartElements, action.payload];
            })

            .addCase(editCreateCard.fulfilled, (state, action) => {
                state.cartElements = state.cartElements.map(item => item.id = action.payload.id ? action.payload : item);
            })

            .addDefaultCase(() => {})
    }
})

const {reducer} = cartSlise;


export default reducer