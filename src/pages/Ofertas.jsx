import { useState, useEffect } from 'react';
import TarjetaOferta from '../components/TarjetaOferta';

function Ofertas({ agregarProducto }) {
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=8")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setOfertas(datos.products);
                setCargando(false);
            })
            .catch(() => {
                setError("Error al cargar los productos");
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p className="p-4 fw-bold">Cargando ofertas...</p>;
    }

    if (error !== "") {
        return <p className="p-4 text-danger fw-bold">Error: {error}</p>;
    }

return (
        <div className="bg-info p-4">
            <h2 className="mb-4 fw-bold">Productos en Oferta</h2>
            <div className="row gap-3 ps-3">
                {ofertas.map((item) => (
                    <TarjetaOferta
                        key={item.id}
                        producto={{
                            nombre: item.title,
                            precio: item.price,
                            descuento: item.discountPercentage,
                            disponible: item.stock > 0,
                            stock: item.stock,
                            imagen: item.thumbnail,
                            esLicor: false
                        }}

                        agregarProducto={agregarProducto}
                    />
                ))}
            </div>
        </div>
    );
}

export default Ofertas;