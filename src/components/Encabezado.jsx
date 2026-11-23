
import { Link } from 'react-router-dom';

function encabezado({ titulo }) {
    return(
        <header>

            <h1>Tienda {titulo}</h1>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                            <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            <Link className="nav-link" to="/productos">Productos</Link>
                            <Link className="nav-link" to="/mis-compras">Carrito</Link>
                            <Link className="nav-link" to="/catalogo">Catalogo</Link>
                            <Link className="nav-link" to="/ofertas">Ofertas</Link>
                            <Link className="nav-link" to="/contactos">Contactos</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default encabezado;