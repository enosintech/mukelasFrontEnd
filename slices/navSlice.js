import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProducts: [],
}

export const navSlice = createSlice({
    name: "nav", 
    initialState,
    reducers: {
        setSelectedProducts : (state, action ) => {
            state.selectedProducts = action.payload;
        },
    }
})

export const { setSelectedProducts} = navSlice.actions;

export const selectSelectedProducts = (state) => state.nav.selectedProducts;

export default navSlice.reducer;