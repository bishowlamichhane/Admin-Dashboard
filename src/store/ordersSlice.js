import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name: "orders",
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            return action.payload;
        }
    }
})

export const orderAction = ordersSlice.actions;
export default ordersSlice;