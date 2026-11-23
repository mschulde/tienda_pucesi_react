import { useState } from "react";

function TarjetaOferta({ producto, agregarProducto, onActualizar }) {
    const [contador, setContador] = useState(0);
    const [ahorroAcumulado, setAhorroAcumulado] = useState(0);

    let descuentoPorcentaje = producto.descuento;
    let descuentoValor = (producto.precio * descuentoPorcentaje) / 100;
    let precioFinal = producto.precio - descuentoValor;
    let ivaValor = precioFinal * 0.15;
    let precioFinalIVA = precioFinal + ivaValor;
    let stock = producto.stock;

    let subtotal = precioFinal * contador;
    let totalFinal = precioFinalIVA * contador;

    let descuentoAviso = "";
    if (descuentoPorcentaje >= 10) {
        descuentoAviso = "¡Gran Oferta!";
    } else {
        descuentoAviso = "Oferta";
    }

    function mostrarProducto() {
        setContador(contador + 1);
        setAhorroAcumulado(ahorroAcumulado + descuentoValor);
    }


    function comprarProducto() {
        if (contador > 0) {
            if (agregarProducto) {
                agregarProducto(producto.nombre, contador, precioFinal, producto.esLicor, ahorroAcumulado);
            }
        } else {
            alert("Primero presiona 'Agregar' para elegir la cantidad.");
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
                <p className="card-text mb-1">
                    Antes: ${producto.precio.toFixed(2)}
                </p>

                <p className="card-text mb-1">
                    Descuento ({descuentoPorcentaje}%): -${descuentoValor.toFixed(2)}
                </p>

                <p className="card-text fw-bold mb-1">
                    Ahora: ${precioFinal.toFixed(2)}
                </p>

                <p className="fw-bold mb-1">IVA (15%): ${ivaValor.toFixed(2)}</p>
                <p className="fw-bold badge bg-success mb-2">
                    Precio con IVA: ${precioFinalIVA.toFixed(2)}
                </p><br />

                <span className={descuentoPorcentaje >= 10 ? "badge bg-danger mb-1" : "badge bg-secondary mb-1"}>
                    {descuentoAviso}
                </span><br />

                <span className={producto.disponible ? "badge bg-success mb-1" : "badge bg-danger mb-1"}>
                    {producto.disponible ? "Disponible" : "No Disponible"}
                </span><br />

                <span className={stock > 10 ? "badge bg-success mb-3" : stock >= 5 ? "badge bg-warning text-dark mb-3" : "badge bg-danger mb-3"}>
                    Stock: {stock}
                </span><br />

                <button className="btn btn-primary me-2" onClick={mostrarProducto}>
                    Agregar
                </button>

                <button className="btn btn-danger" onClick={comprarProducto}>
                    Comprar
                </button>

                <h5 className="mt-3">Cantidad: {contador}</h5>
                <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
                <h5 className="fw-bold">Ahorro: ${ahorroAcumulado.toFixed(2)}</h5>
                <h4 className="fw-bold">Total Final (inc. IVA): ${totalFinal.toFixed(2)}</h4>
            </div>
        </section>
    );
}

export default TarjetaOferta;