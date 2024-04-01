import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import {Toaster} from "react-hot-toast"
import Header from './components/Header'
import Footer from './components/Footer.jsx'


function App() {

    return (
        <Provider store={store}>
            <Toaster position="top-center" reverseOrder={false} />
            <main className='overflow-x-hidden'>
                <Header />
                <Outlet />
                <Footer />
            </main>
        </Provider>
    )
}

export default App
