import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import {Toaster} from "react-hot-toast"

function App() {

    return (
        <Provider store={store}>
            <Toaster position="top-center" reverseOrder={false} />
            <div className='w-screen'>
                <Header />
                <Outlet />
            </div>
        </Provider>
    )
}

export default App
