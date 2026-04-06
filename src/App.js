import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/bus?page=${page}&size=5`, {
      headers: {
        "Authorization": "Basic " + btoa("admin:1234")
      }
    })
      .then(response => response.json())
      .then(data => {
        setBuses(data.content);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  return (
    <body>
      <nav className="navbar bg-custom-purple" data-bs-theme="dark">
        <div className="container justify-content-center">
          <span className="navbar-brand mb-0 h1"><h3>LISTA DE BUSES</h3></span>
        </div>
      </nav>
      <br>
      </br>
      <div className="container">
        <table className="table table-hover table-bordered border-dark">
          <thead>
            <tr className="table-secondary table-bordered border-dark">
              <th>ID</th>
              <th>Nombre</th>
              <th>Placa</th>
              <th>Fecha Creación</th>
              <th>Caracteristicas</th>
              <th>Marca</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {buses.map(bus => (
              <tr key={bus.idBus}>
                <td>{bus.idBus}</td>
                <td>{bus.numBus}</td>
                <td>{bus.placa}</td>
                <td>{bus.fecCreacion}</td>
                <td>{bus.caracteristica}</td>
                <td>{bus.marca?.nombre}</td>
                <td>{bus.estado ? "Activo" : "Inactivo"}</td>
                <td>
                  <button className="btn btn-custom-purple" onClick={() => window.open(`/detalle/${bus.idBus}`, "_blank")}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="d-flex justify-content-center fw-bold">
        Página {page + 1} de {totalPages}
      </p>

      <div className="d-flex justify-content-center">
        <button className="btn btn-custom-purple me-3" onClick={() => setPage(page - 1)} disabled={page === 0}>Anterior</button>
        <button className="btn btn-custom-purple" onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Siguiente</button>
      </div>
    </body>

  );
}

export default App;
