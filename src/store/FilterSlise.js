import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../api/http.hook";

const initialState = {
    categoryesFilters: [],
    sortFilters: [],

    activeCategoryes: 'Все',
    activeSort: 'популярности',
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3000/categoryes")
    }
)

export const fetchSort = createAsyncThunk(
    'sorts/fetchSorts',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3000/sort")
    }
)

const filtersSlise = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilters: (state, action) => {
            state.activeCategoryes = action.payload
        },
        changeSort: (state, action) => {
            state.activeSort = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.categoryesFilters = action.payload;
            })
            .addCase(fetchSort.fulfilled, (state, action) => {
                state.sortFilters = action.payload;
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filtersSlise;

export default reducer

export const { changeFilters, changeSort } = actions