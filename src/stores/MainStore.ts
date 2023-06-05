/** A main store for the whole app. */

import { useDispatch } from 'react-redux'
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { commentsSlice } from "./comments";

const rootReducer = combineReducers( {
    comments: commentsSlice.reducer,
} )

export const mainStore = configureStore( {
    reducer: rootReducer
} );

export type AppDispatch = typeof mainStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof rootReducer>
export default mainStore;

