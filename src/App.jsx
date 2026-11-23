import { useState } from 'react'
import './App.css'
import Encabezado from './components/Encabezado'
import Inicio from './pages/Inicio'
import Contactos from './pages/Contactos'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import CatalogoWeb from './pages/CatalogoWeb'
import Ofertas from './pages/Ofertas'
import { BrowserRouter, Route, Routes as Routers } from 'react-router-dom'

function App() {
  const [listaProductos, setListaProductos] = useState([]);

  // Recibe el ahorro opcional (0 si es producto normal, >0 si viene de Ofertas)
  function agregarProducto(nombre, cantidad, precio, esLicor, ahorro) {
    const nuevoProducto = {
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
      esLicor: esLicor || false,
      ahorro: ahorro || 0
    };

    setListaProductos([...listaProductos, nuevoProducto]);
  }

  function vaciarCarrito() {
    setListaProductos([]);
  }

  return (
    <BrowserRouter>
      <main>
        <section>
          <Encabezado titulo={"PUCE Ibarra"} />
          <Routers>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos agregarProducto={agregarProducto} />} />
            <Route path="/mis-compras" element={<Carrito listaProductos={listaProductos} vaciarCarrito={vaciarCarrito} />} />
            <Route path="/catalogo" element={<CatalogoWeb agregarProducto={agregarProducto} />} />
            <Route path="/ofertas" element={<Ofertas agregarProducto={agregarProducto} />} />
            <Route path="/contactos" element={<Contactos />} />
          </Routers>
        </section>
      </main>
    </BrowserRouter>
  )
}

export default App