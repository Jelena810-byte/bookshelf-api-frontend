import api from "./apiConfig.js";

export const getBooks = async () => {
  try {
    const response = await api.get("/books/");
    return response.data;
    // console.log('services', response.data)
  } catch (error) {
    throw error;
  }
};


export const getBook = async (id) => {
  try {
    const response = await api.get(`/books/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createBook = async (bookData) => {
  try {
    const response = await api.post("/books/", bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}/`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/${id}/delete/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

