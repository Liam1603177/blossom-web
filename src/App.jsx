import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Reservas from './pages/Reservas'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'


function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/nosotros' element={<About />} />
        <Route path='/contacto' element={<Contact />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path="/menu/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
