import { useState } from "react";
import CardProducto from "../components/CardProducto";
import SeccionCategoria from "../components/SeccionCategoria";

function Productos({ agregarProducto }) {

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [edad, setEdad] = useState('');
    const [carrito, setCarrito] = useState({});

    const manejarActualizacion = (nombreProd, cantidad, totalF) => {
        setCarrito(prevCarrito => ({
            ...prevCarrito,
            [nombreProd]: { cantidad, totalF }
        }));
    };

    const totalCompra = Object.values(carrito).reduce((acc, item) => acc + (item.totalF || 0), 0);

    return (
        <div className="bg bg-info p-4">
            <div className="row">
                
                {/* LADO IZQUIERDO: PRODUCTOS */}
                <div className="col-md-8">
                    <h2 className="badge bg-secondary mb-3 fs-4">Lista de Productos</h2>
                    
                    <div className="row gap-3 mb-5 ps-3">

                        <CardProducto producto={{nombre: "Pilsener", precio: 2.50, disponible: true, stock: 12, esLicor: true}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto}/>
                        <CardProducto producto={{nombre: "Club", precio: 2.70, disponible: true, stock: 7, esLicor: true}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto}/>
                        <CardProducto producto={{nombre: "Corona", precio: 2.00, disponible: false, stock: 3, esLicor: true}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto}/>
                    </div>

                    <h2 className="mb-4">Sección de Categorías</h2>
                    
                    <SeccionCategoria titulo="Snacks">
                        <CardProducto producto={{nombre: "Kchitos", precio: 1.00, disponible: true, stock: 15}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                        <CardProducto producto={{nombre: "Papas Caseras", precio: 1.00, disponible: true, stock: 8}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                        <CardProducto producto={{nombre: "Cueritos", precio: 0.50, disponible: false, stock: 2}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                    </SeccionCategoria>

                    <SeccionCategoria titulo="Dulces">
                        <CardProducto producto={{nombre: "Manicho", precio: 0.75, disponible: true, stock: 15}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                        <CardProducto producto={{nombre: "Gomitas Trululu", precio: 1.00, disponible: false, stock: 1}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                        <CardProducto producto={{nombre: "Chicles", precio: 0.05, disponible: true, stock: 5}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                    </SeccionCategoria>

                    <SeccionCategoria titulo="Cigarrillos">
                        <CardProducto producto={{nombre: "Marlboro", precio: 0.40, disponible: true, stock: 30}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                        <CardProducto producto={{nombre: "Lark", precio: 0.50, disponible: true, stock: 15}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                        <CardProducto producto={{nombre: "L&M", precio: 0.25, disponible: false, stock: 0}} onActualizar={manejarActualizacion} agregarProducto={agregarProducto} />
                    </SeccionCategoria>
                </div>

                {/* LADO DERECHO: RESUMEN DEL CARRITO */}
                <div className="col-md-4">
                    <div className="card shadow position-sticky" style={{ top: '20px' }}>
                        <div className="card-header bg-dark text-white">
                            <h4 className="mb-0 text-center">Resumen de Compra</h4>
                        </div>
                        
                        <div className="card-body">
                            <h5 className="mb-3 text-secondary border-bottom pb-2">Tus Datos</h5>
                            <div className="mb-2">
                                <label className="form-label fw-bold mb-1">Nombre:</label>
                                <input type="text" className="form-control form-control-sm" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label className="form-label fw-bold mb-1">Dirección:</label>
                                <input type="text" className="form-control form-control-sm" placeholder="Ingresa tu dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold mb-1">Edad:</label>
                                <input type="number" className="form-control form-control-sm" placeholder="Ingresa tu edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
                            </div>

                            <h5 className="mb-3 mt-4 text-secondary border-bottom pb-2">Tus Productos</h5>
                            <ul className="list-group list-group-flush mb-3">
                                {Object.keys(carrito).filter(key => carrito[key].cantidad > 0).length === 0 ? (
                                    <li className="list-group-item text-muted text-center px-0">El carrito está vacío</li>
                                ) : (
                                    Object.keys(carrito).map(key => (
                                        carrito[key].cantidad > 0 && (
                                            <li key={key} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                <span>{key} <strong>(x{carrito[key].cantidad})</strong></span>
                                                <span>${carrito[key].totalF.toFixed(2)}</span>
                                            </li>
                                        )
                                    ))
                                )}
                            </ul>

                            <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
                                <span className="fs-5 fw-bold">Total a Pagar:</span>
                                <span className="fs-4 fw-bold text-success">${totalCompra.toFixed(2)}</span>
                            </div>

                            <button className="btn btn-warning w-100 fw-bold fs-5 shadow-sm" disabled={totalCompra === 0}>
                                Proceder al Pago
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Productos;