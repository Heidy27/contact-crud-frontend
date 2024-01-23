import "./Cards.css";

const Tarjetas = ({ personas, contactos, onEdit, onDelete }) => {
  return (
    <div className="card-container">
      {personas.map((persona) => (
        <div key={persona.id} className="persona-card">
          <h2>{persona.nombre}</h2>
          <p>Cédula: {persona.cedula}</p>
          <div>
            <strong>Contactos:</strong>
            <ul>
              {contactos[persona.id]?.map((contacto) => (
                <li key={contacto.id}>
                  {contacto.celular} - {contacto.telefono} - {contacto.correo}
                </li>
              ))}
            </ul>
          </div>
          <div className="buttons-container">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tarjetas;
