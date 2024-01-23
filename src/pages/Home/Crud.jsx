import React, { useState, useEffect } from "react";
import "./Crud.css";
import {
  getAllPersonas,
  createPersona,
  updatePersona,
  deletePersona,
  getAllContactosByPersonaId,
  createContacto,
  updateContacto,
} from "../../Api";
import Tabla from "../../Components/Table/Table";
import Tarjetas from "../../Components/Cards/Cards";
import Modal from "../../Components/Modal/Modal";

const Crud = () => {
  const [personas, setPersonas] = useState([]);
  const [contactos, setContactos] = useState({});
  const [vistaTabla, setVistaTabla] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [personaEditada, setPersonaEditada] = useState(null);
  const [guardarContacto, setGuardarContacto] = useState(false);
  const [personaGuardadaId, setPersonaGuardadaId] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const datosPersonas = await getAllPersonas();
        setPersonas(datosPersonas);

        for (const persona of datosPersonas) {
          const datosContactos = await getAllContactosByPersonaId(persona.id);
          setContactos((prevContactos) => ({
            ...prevContactos,
            [persona.id]: datosContactos,
          }));
        }
      } catch (error) {
        console.error("Hubo un error al recuperar las personas:", error);
      }
    };

    fetchPersonas();
  }, []);

  const handleCreateOrUpdate = async (data, tipo, personaCreada) => {
    const { nombre, cedula, telefono, correo } = data;
    try {
      if (tipo === "persona") {
        // Actualizar el estado de personas con la persona creada
        setPersonas((prevPersonas) => [...prevPersonas, personaCreada]);

        // Configurar el modal para mostrar la sección de "Guardar Contacto"
        setMostrarModal(true);
        setGuardarContacto(true);
        setPersonaGuardadaId(personaCreada.id); // Guardar el ID de la persona creada
      } else if (tipo === "contactoGuardado") {
        // Actualizar el estado de contactos si es necesario
        const { personaId, id } = personaEditada;
        const updatedContacts = { ...contactos };
        updatedContacts[personaId] = updatedContacts[personaId].map(
          (contacto) =>
            contacto.id === id ? { ...contacto, telefono, correo } : contacto
        );
        setContactos(updatedContacts);
      }
      // Cerrar el modal y restablecer la persona editada
      setPersonaEditada(null);
    } catch (error) {
      console.error(
        "Error al crear o actualizar la persona y el contacto:",
        error
      );
    }
  };

  const handleUpdate = (id) => {
    // Encuentra la persona a editar y abre el modal para edición
    const personaAEditar = personas.find((persona) => persona.id === id);
    setPersonaEditada(personaAEditar);
    setMostrarModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePersona(id);
      // Eliminar persona del estado
      setPersonas((prevPersonas) =>
        prevPersonas.filter((persona) => persona.id !== id)
      );
      // Eliminar contactos asociados de estado
      setContactos((prevContactos) => {
        const newContactos = { ...prevContactos };
        delete newContactos[id];
        return newContactos;
      });
    } catch (error) {
      console.error("Error al eliminar la persona:", error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Personas</h1>
        <button
          className="btn crear"
          onClick={() => {
            setPersonaEditada(null);
            setMostrarModal(true);
          }}
        >
          Crear Persona
        </button>
        <button onClick={() => setVistaTabla(!vistaTabla)}>
          {vistaTabla ? "Ver como Tarjetas" : "Ver como Tabla"}
        </button>
      </header>
      <main className="personas-container">
        {vistaTabla ? (
          <Tabla
            personas={personas}
            contactos={contactos}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />
        ) : (
          <Tarjetas
            personas={personas}
            contactos={contactos}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </main>
      {mostrarModal && (
        <Modal
          onClose={() => setMostrarModal(false)}
          onSave={handleCreateOrUpdate}
          persona={personaEditada}
          setGuardarContacto={setGuardarContacto}
          personaGuardadaId={personaGuardadaId}
          setPersonaGuardadaId={setPersonaGuardadaId}
        />
      )}
    </div>
  );
};

export default Crud;
