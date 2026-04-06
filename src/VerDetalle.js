import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function VerDetalle() {
    const { id } = useParams(); 
    const [bus, setBus] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/bus/${id}`, {
            headers: {
                "Authorization": "Basic " + btoa("admin:1234")
            }
        })
        .then(response => response.json())
        .then(data => setBus(data));
    }, [id]);

    if (!bus) return <p>Cargando...</p>;

    return (
        <div>
            <nav className="navbar bg-custom-purple" data-bs-theme="dark">
                <div className="container justify-content-center">
                    <span className="navbar-brand mb-0 h1"><h3>DETALLES DE BUS</h3></span>
                </div>
            </nav>
            <br>
            </br>
            <div className="container">
                <table className="table table-hover table-bordered border-dark">
                    <thead>
                        <div className="table-secondary table-bordered border-dark">
                            <p><strong>ID:</strong> {bus.idBus}</p>
                            <p><strong>Nombre:</strong> {bus.numBus}</p>
                            <p><strong>Placa:</strong> {bus.placa}</p>
                            <p><strong>Fecha Creacion:</strong> {bus.fecCreacion}</p>
                            <p><strong>Caracteristicas:</strong> {bus.caracteristica}</p>
                            <p><strong>Marca:</strong> {bus.marca?.nombre}</p>
                            <p><strong>Estado:</strong> {bus.estado ? "Activo" : "Inactivo"}</p>
                        </div>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default VerDetalle;
