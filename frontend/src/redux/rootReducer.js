import { combineReducers } from "@reduxjs/toolkit";
import linkSlice from './slice/link'


const rootReducer = combineReducers({
   links: linkSlice
})

export { rootReducer }