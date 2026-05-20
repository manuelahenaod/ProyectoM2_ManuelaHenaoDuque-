const authorsServices = require('../services/authorsServices');

const getAuthors = async (req, res, next) => {
  try {
    const authors = await authorsServices.getAllAuthors();

    res.json(authors);

  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const author = await authorsServices.getAuthorById(req.params.id);

    if (!author) {
      const error = new Error('Autor no encontrado');
      error.status = 404;

      return next(error);
    }

    res.json(author);

  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    const error = new Error('Nombre y email son requeridos');
    error.status = 400;

    return next(error);
  }

  try {
    const newAuthor = await authorsServices.createAuthor(req.body);

    res.status(201).json(newAuthor);

  } catch (error) {

    if (error.code === '23505') {
      error.status = 409;
      error.message = 'El email ya está registrado';
    }

    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const updatedAuthor = await authorsServices.updateAuthor(
      req.params.id,
      req.body
    );

    if (!updatedAuthor) {
      const error = new Error('Autor no encontrado');
      error.status = 404;

      return next(error);
    }

    res.json(updatedAuthor);

  } catch (error) {

    if (error.code === '23505') {
      error.status = 409;
      error.message = 'El email ya está registrado';
    }

    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const deleted = await authorsServices.deleteAuthor(req.params.id);

    if (!deleted) {
      const error = new Error('Autor no encontrado');
      error.status = 404;

      return next(error);
    }

    res.json({
      message: 'Autor eliminado exitosamente'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};