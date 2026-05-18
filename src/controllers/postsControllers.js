const pool = require('../../db/config');

const getPosts = async (req, res, next) => {
      const { published } = req.query;
  
  try {
    let query = 'SELECT * FROM posts';
    let params = [];
    
    if (published !== undefined) {
      query += ' WHERE published = $1';
      params.push(published === 'true');
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);

    res.json(result.rows);

  } catch (error) {
    console.error('Error obteniendo posts:', error);
    
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      const error = new Error('Post no encontrado');
      error.status = 404;
      return next(error);
    }
    
    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error obteniendo post:', error);

    next(error);
  }
};

const getPostsByAuthor = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC',
      [req.params.authorId]
    );
    
    res.json(result.rows);

  } catch (error) {
    console.error('Error obteniendo posts del autor:', error);

    next(error);
  }
};

const createPost = async (req, res, next) => {
    const { title, content, author_id, published } = req.body;
  
  if (!title || !content || !author_id) {
    const error = new Error('Título, contenido y author_id son requeridos');
    error.status = 400;

    return next(error);
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, author_id, published || false]
    );
    
    res.status(201).json(result.rows[0]);
    
  } catch (error) {
    console.error('Error creando post:', error);
    
    if (error.code === '23503') {
      error.status = 404;
      error.message = 'El autor especificado no existe';
    }
    
    next(error);
  }
};

const updatePost = async (req, res, next) => {
    const { title, content, published } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), published = COALESCE($3, published) WHERE id = $4 RETURNING *',
      [title, content, published, req.params.id]
    );
    
    if (result.rows.length === 0) {
      const error = new Error('Post no encontrado');
      error.status = 404;

      return next(error);
      
    }
    
    res.json(result.rows[0]);
    
  } catch (error) {
    console.error('Error actualizando post:', error);

    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      const error = new Error('Post no encontrado');
      error.status = 404;
      
      return next(error);
    }
    
    res.json({ message: 'Post eliminado exitosamente' });

  } catch (error) {
    console.error('Error eliminando post:', error);

    next(error);
  }
};


module.exports = {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
  };