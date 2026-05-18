const express = require('express');
const router = express.Router();

const   {getPosts}  = require('../controllers/postsControllers');
const   {getPostById}  = require('../controllers/postsControllers');
const   {getPostsByAuthor}  = require('../controllers/postsControllers');
const  {createPost}  = require('../controllers/postsControllers');
const {updatePost}  = require('../controllers/postsControllers');
const {deletePost}  = require('../controllers/postsControllers');

router.get('/', getPosts);

router.get('/:id', getPostById);    

router.get('/author/:authorId', getPostsByAuthor);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;