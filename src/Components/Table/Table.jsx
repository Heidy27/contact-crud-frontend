import "./Table.css";

const Tabla = ({ personas, contactos, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Contactos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombre}</td>
              <td>{persona.cedula}</td>
              <td>
                {contactos[persona.id]?.map((contacto) => (
                  <div key={contacto.id}>
                    {contacto.celular} - {contacto.telefono} - {contacto.correo}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="btn actualizar"
                  onClick={() => onEdit(persona.id)}
                >
                  Editar
                </button>
                <button
                  className="btn eliminar"
                  onClick={() => onDelete(persona.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
