import { Routes, Route } from 'react-router-dom'
import Loader from './pages/loader/index'
import PageLoading from './pages/PageLoading/index'
import Home from './pages/Home/index'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Loader />} />
            <Route path="/loading" element={<PageLoading />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default App
