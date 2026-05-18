const pool = require('../../db/config');

const getAuthors = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM authors ORDER BY name'
    );

    res.json(result.rows);

  } catch (error) {
    console.error('Error obteniendo autores:', error);

   next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM authors WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      const error = new Error('Autor no encontrado');
      error.status = 404;

      return next(error);
    }
    
    res.json(result.rows[0]);
    
  } catch (error) {
    console.error('Error obteniendo autor:', error);
    next(error);
  }
}

const createAuthor = async (req, res, next) => {
  const { name, email, bio } = req.body;
  
  if (!name || !email) {
    const error = new Error('Nombre y email son requeridos');
    error.status = 400;

    return next(error);
    }
  
  try {
    const result = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio || null]
    );
    
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error creando autor:', error);
    
    if (error.code === '23505') {
      error.status = 409;
      error.message = 'El email ya está registrado';
    }
    
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
    const { name, email, bio } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *',
      [name, email, bio, req.params.id]
    );
    
    if (result.rows.length === 0) {
      const error = new Error('Autor no encontrado');
      error.status = 404;

      return next(error);
    }
    
    res.json(result.rows[0]);
    
  } catch (error) {
    console.error('Error actualizando autor:', error);
    
    if (error.code === '23505') {
      error.status = 409;
      error.message = 'El email ya está registrado';
    }
    
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
    try {
     const result = await pool.query(
      'DELETE FROM authors WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      const error = new Error('Autor no encontrado');
      error.status = 404;
      
      return next(error);
    }
    
    res.json({ message: 'Autor eliminado exitosamente' });

  } catch (error) {
    console.error('Error eliminando autor:', error);
    next(error);
  }
};


module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
