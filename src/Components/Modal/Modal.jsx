import "./Modal.css";
import React, { useState } from "react";
import { createPersona, createContacto } from "../../Api";

const Modal = ({
  onClose,
  onSave,
  persona,
  setGuardarContacto,
  personaGuardadaId,
  setPersonaGuardadaId,
  getAllPersonas,
}) => {
  const [nombre, setNombre] = useState(persona ? persona.nombre : "");
  const [cedula, setCedula] = useState(persona ? persona.cedula : "");
  const [celular, setCelular] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [modo, setModo] = useState("persona"); // Modo inicial: "persona"

  const handleGuardarPersona = async () => {
    try {
      const commandResult = await createPersona({ nombre, cedula });
      const { personaId } = commandResult;
      if (personaId) {
        setPersonaGuardadaId(personaId);
        setModo("contacto");
      } else {
        throw new Error("El ID de la persona no fue devuelto.");
      }
    } catch (error) {
      console.error("Error al crear la persona:", error);
    }
  };

  const handleGuardarContacto = async () => {
    try {
      if (
        !personaGuardadaId ||
        !celular ||
        !telefono ||
        !correo ||
        !direccion
      ) {
        console.error("Faltan datos necesarios para crear el contacto.");
        return;
      }

      const contactoData = {
        personaId: personaGuardadaId,
        celular,
        telefono,
        correo,
        direccion,
      };

      const contactoCreado = await createContacto(contactoData);

      if (contactoCreado) {
        onSave(contactoCreado);
        onClose();
      } else {
        console.error("Error al crear el contacto.");
      }
    } catch (error) {
      console.error("Error al crear el contacto:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{persona ? "Editar Persona" : "Crear Nueva Persona"}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        {modo === "contacto" && (
          <>
            <input
              type="text"
              placeholder="Celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <input
              type="text"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </>
        )}
        {modo === "persona" ? (
          <button onClick={handleGuardarPersona}>Guardar Persona</button>
        ) : (
          <button onClick={handleGuardarContacto}>Guardar Contacto</button>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
