const express = require('express');
const router = express.Router();

const   {getAuthors}  = require('../controllers/authorsControllers');
const   {getAuthorById}  = require('../controllers/authorsControllers');
const   {createAuthor}  = require('../controllers/authorsControllers');
const   {updateAuthor}  = require('../controllers/authorsControllers');
const  {deleteAuthor}  = require('../controllers/authorsControllers');

router.get('/', getAuthors);

router.get('/:id', getAuthorById); 

router.post('/', createAuthor);

router.put('/:id', updateAuthor);

router.delete('/:id', deleteAuthor);


module.exports = router;