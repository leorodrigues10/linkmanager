import { combineReducers } from "@reduxjs/toolkit";
import linkSlice from './slice/link'


const rootReducer = combineReducers({
   link: linkSlice
})

export { rootReducer }