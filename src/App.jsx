import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Reservas from './pages/Reservas'
import Footer from './components/Footer'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/nosotros' element={<About />} />
        <Route path='/contacto' element={<Contact />} />
        <Route path='/reservas' element={<Reservas />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
