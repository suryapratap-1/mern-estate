import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
// import getDefaultMiddleware from "@reduxjs/toolkit"


const store = configureStore({
  reducer: { user: userSlice },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  
  // middleware: (getDefaultMiddleware) => {
  //   serializableCheck: false
  // }
})

export default store  