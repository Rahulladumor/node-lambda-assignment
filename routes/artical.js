const express = require('express');
const router = express.Router();

const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controller/artical');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', createOne)
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);


module.exports = router;