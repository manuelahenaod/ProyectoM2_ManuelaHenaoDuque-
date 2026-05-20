const pool = require('../db/config');

const getAllPosts = async (published) => {
  let query = 'SELECT * FROM posts';
  let params = [];

  if (published !== undefined) {
    query += ' WHERE published = $1';
    params.push(published === 'true');
  }

  query += ' ORDER BY created_at DESC';

  const result = await pool.query(query, params);

  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM posts WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

const getPostsByAuthor = async (authorId) => {
  const result = await pool.query(
    'SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC',
    [authorId]
  );

  return result.rows;
};

const createPost = async ({
  title,
  content,
  author_id,
  published
}) => {
  const result = await pool.query(
    `INSERT INTO posts
    (title, content, author_id, published)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [
      title,
      content,
      author_id,
      published || false
    ]
  );

  return result.rows[0];
};

const updatePost = async (
  id,
  { title, content, published }
) => {
  const result = await pool.query(
    `UPDATE posts
     SET
      title = COALESCE($1, title),
      content = COALESCE($2, content),
      published = COALESCE($3, published)
     WHERE id = $4
     RETURNING *`,
    [title, content, published, id]
  );

  return result.rows[0];
};

const deletePost = async (id) => {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1',
    [id]
  );

  return result.rowCount;
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};