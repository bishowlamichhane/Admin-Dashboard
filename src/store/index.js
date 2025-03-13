import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import ordersSlice from "./ordersSlice";


const OpenSales=configureStore({
    reducer:{
        items:itemsSlice.reducer,
        orders:ordersSlice.reducer,

    }
})

export default OpenSales;