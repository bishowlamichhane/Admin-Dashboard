import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    replaceItems: (state, action) => {
      // Replace the entire items array with the payload
      return action.payload;
    },
    addItems: (state, action) => {
      // Add new items to the current state
      state.push(...action.payload);
    },
    removeItems: (state, action) => {
      // Remove items based on their id (assuming items have an id property)
      return state.filter((item) => item.id !== action.payload);
    },
    bulkDeleteItems: (state, action) => {
      // Remove multiple items based on an array of IDs
      const idsToDelete = new Set(action.payload);
      return state.filter((item) => !idsToDelete.has(item.id));
    },
    editItem: (state, action) => {
      const { id, field, value } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem[field] = value;
      }
    },
  },
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice;
