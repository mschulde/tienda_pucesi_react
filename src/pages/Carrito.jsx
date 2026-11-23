import { useState } from "react";

function Carrito({ listaProductos, vaciarCarrito }) {
    const [nombre, setNombre] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [edad, setEdad] = useState("");

    let textoIva= "";
    let filas = [];
    let totalGeneral = 0;
    let totalAhorrado = 0;


    for (let i = 0; i < listaProductos.length; i++) {
        let item = listaProductos[i];
        let subtotal = item.precio * item.cantidad;
        totalAhorrado = totalAhorrado + (item.ahorro || 0);

        if (edad !== "" && edad < 18) {
            porcentajeIva = 0;
            textoIva = "0% (Menor de edad)";
        } else if (edad !== "" && edad> 65) {
            porcentajeIva = 0.08;
            textoIva = "8% (Tercera edad)";
        }
    }

    function generarFactura() {
        if (nombre === "" || ciudad === "" || edad === "") {
            alert("Por favor ingrese su Nombre, Ciudad y Edad antes de generar la factura.");
            return;
        }
        if (totalGeneral === 0) {
            alert("No hay productos válidos para facturar.");
            return;
        }

        alert(
            "¡Pago procesado con éxito!\n\n" +
            "Cliente: " + nombre + "\n" +
            "Ciudad: " + ciudad + "\n" +
            "Edad: " + edadNum + " años\n" +
            "Total Facturado: $" + totalGeneral.toFixed(2)
        );
    }

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0" style={{ color: '#005baa' }}>Mis Compras (Carrito)</h2>
                
                {listaProductos.length > 0 && (
                    <button className="btn btn-outline-danger fw-bold" onClick={vaciarCarrito}>
                        Vaciar Compra
                    </button>
                )}
            </div>

            <div className="bg-light p-3 border rounded mb-4">
                <h5 className="fw-bold mb-3">Datos para la Factura</h5>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <label className="form-label fw-bold">Nombre:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ej. Sebastian Chulde"
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <label className="form-label fw-bold">Ciudad:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ej. Ibarra"
                            value={ciudad} 
                            onChange={(e) => setCiudad(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <label className="form-label fw-bold">Edad:</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Ingresa tu edad"
                            value={edad} 
                            onChange={(e) => setEdad(e.target.value)} 
                        />
                    </div>
                </div>
                {edad !== "" && (
                    <span className="badge bg-info text-dark mt-2">
                        Tarifa de IVA aplicada según edad: {textoIva}
                    </span>
                )}
            </div>

            {listaProductos.length === 0 ? (
                <p className="text-muted fs-5">Aún no has comprado ningún producto. Ve a la sección Productos y presiona "Comprar".</p>
            ) : (
                <div>
                    <table className="table table-bordered table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario ($)</th>
                                <th>Subtotal ($)</th>
                                <th>IVA ({textoIva})</th>
                                <th>ICE (19%)</th>
                                <th>Total ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filas}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button className="btn btn-success btn-lg fw-bold" onClick={generarFactura}>
                            Generar Factura
                        </button>
                        <h3 className="fw-bold text-success m-0">Total a Pagar: ${totalGeneral.toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrito;