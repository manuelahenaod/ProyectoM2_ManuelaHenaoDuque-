const postsServices = require('../services/postsServices');

const getPosts = async (req, res, next) => {
  try {
    const posts = await postsServices.getAllPosts(
      req.query.published
    );

    res.json(posts);

  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postsServices.getPostById(
      req.params.id
    );

    if (!post) {
      const error = new Error('Post no encontrado');
      error.status = 404;

      return next(error);
    }

    res.json(post);

  } catch (error) {
    next(error);
  }
};

const getPostsByAuthor = async (req, res, next) => {
  try {
    const posts = await postsServices.getPostsByAuthor(
      req.params.authorId
    );

    res.json(posts);

  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  const {
    title,
    content,
    author_id
  } = req.body;

  if (!title || !content || !author_id) {
    const error = new Error(
      'Título, contenido y author_id son requeridos'
    );

    error.status = 400;

    return next(error);
  }

  try {
    const newPost = await postsServices.createPost(
      req.body
    );

    res.status(201).json(newPost);

  } catch (error) {

    if (error.code === '23503') {
      error.status = 404;
      error.message = 'El autor especificado no existe';
    }

    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await postsServices.updatePost(
      req.params.id,
      req.body
    );

    if (!updatedPost) {
      const error = new Error('Post no encontrado');
      error.status = 404;

      return next(error);
    }

    res.json(updatedPost);

  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deleted = await postsServices.deletePost(
      req.params.id
    );

    if (!deleted) {
      const error = new Error('Post no encontrado');
      error.status = 404;

      return next(error);
    }

    res.json({
      message: 'Post eliminado exitosamente'
    });

  } catch (error) {
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