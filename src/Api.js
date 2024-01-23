import axios from "axios";

const BASE_URL = "https://localhost:7124/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// PersonaContactos Controller
export const getAllContactosByPersonaId = async (personaId) => {
  try {
    const response = await api.get(`/PersonaContactos/${personaId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getContactoById = async (id) => {
  try {
    const response = await api.get(`/PersonaContactos/contacto/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createContacto = async (contactoData) => {
  try {
    const response = await api.post("/PersonaContactos", contactoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    throw error;
  }
};

export const updateContacto = async (id, contactoData) => {
  try {
    const response = await api.put(`/PersonaContactos/${id}`, contactoData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteContacto = async (id) => {
  try {
    await api.delete(`/PersonaContactos/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllPersonas = async () => {
  try {
    const response = await api.get("/Personas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las personas:", error);
    throw error; // Propaga el error para manejarlo en la llamada a la función
  }
};

export const getPersonaByCedula = async (cedula) => {
  try {
    const response = await api.get(`/Personas/${cedula}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPersona = async (personaData) => {
  try {
    const response = await api.post("/Personas", personaData);
    return response.data; // Asegúrate de que esto incluye el ID
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePersona = async (id, personaData) => {
  try {
    const response = await api.put(`/Personas/${id}`, personaData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePersona = async (id) => {
  try {
    await api.delete(`/Personas/${id}`);
  } catch (error) {
    console.error(error);
  }
};
