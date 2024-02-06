import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Provider } from 'react-redux'
import store from "./redux/store.js"

function App() {

    return (
        <Provider store={store}>
            <div className='w-screen'>
                <Header />
                <Outlet />
            </div>
        </Provider>
    )
}

export default App
