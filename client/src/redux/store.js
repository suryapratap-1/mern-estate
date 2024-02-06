import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: { user: userSlice },
  
//   middleware: (getDefaultMiddleware) => {
//     serializableCheck: false
//   }
})

export default store