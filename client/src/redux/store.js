import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import listingSlice from './slices/listingSlice'
// import getDefaultMiddleware from "@reduxjs/toolkit"


const store = configureStore({
  reducer: { 
      user: userSlice,
      listings: listingSlice
  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  
  // // middleware: (getDefaultMiddleware) => {
  // //   serializableCheck: false
  // // }
})

export default store  