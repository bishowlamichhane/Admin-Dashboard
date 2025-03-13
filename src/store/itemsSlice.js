import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItems: (state, action) => {
      // Add new items to the current state without replacing the entire array
      return action.payload;
      
    },

    removeItems: (state, action) => {
      // Remove items based on their id (assuming items have an id property)
      return state.filter((item) => item.id !== action.payload);
    },

    
  },
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice;
