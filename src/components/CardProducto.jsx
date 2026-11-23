import React, { useState } from "react";

function CardProducto({ producto, onActualizar, agregarProducto }) {
    const [descuento, setDescuento] = useState(0);  
    const [contador, setContador] = useState(0);

    let iva = producto.precio * 0.15;
    let total = producto.precio + iva;
    let stock = producto.stock;
    let subtotal = total * contador;
    let totalF = subtotal - (subtotal * (descuento / 100));
    
    function mostrarProducto(){
        setContador(contador + 1);
    }

    function comprarProducto() {
        if (contador > 0) {
            if (agregarProducto) {
                agregarProducto(producto.nombre, contador, producto.precio, producto.esLicor);
            }

            if (onActualizar) {
                onActualizar(producto.nombre, contador, totalF);
            }
        } else {
            alert("Primero presiona 'Solicitar' para elegir la cantidad.");
        }
    }

    return (
        <section className="card" style={{ maxWidth: "320px" }}>
            {producto.imagen && (
                <img 
                    src={producto.imagen} 
                    className="card-img-top p-2" 
                    alt={producto.nombre} 
                    style={{ height: "180px", objectFit: "contain" }} 
                />
            )}

            <div className="card-body">
                <h4 className="card-title">{producto.nombre}</h4>
                <p className="card-text">${producto.precio.toFixed(2)}</p>

                <p className="fw-bold"> IVA (15%): ${iva.toFixed(2)}</p>
                <p className="fw-bold badge bg-success"> Total: ${total.toFixed(2)}</p><br></br>

                <span className={producto.disponible ? "badge bg-success" : "badge bg-danger"}>
                    {producto.disponible ? "Disponible" : "No Disponible"}
                </span><br></br>

                <span className={stock > 10 ? "badge bg-success" : stock >= 5 ? "badge bg-warning" : "badge bg-danger"}>
                    Stock: {stock}
                </span><br></br>

                <button className="btn btn-primary me-2" onClick={mostrarProducto}>
                    Solicitar
                </button>

                <button className="btn btn-danger" onClick={comprarProducto}>
                    Comprar
                </button>

                <h3>Cantidad: {contador}</h3>

                <h3>Subtotal: ${subtotal.toFixed(2)}</h3>

                <h6> % Descuento: </h6>
                <input type="number" min="10" className="form-control form-control-sm" value={descuento} onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}></input>

                <h3>totalF: ${totalF.toFixed(2)}</h3>

            </div>
        </section>
    )
}

export default CardProducto;