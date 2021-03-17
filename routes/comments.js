const express = require('express');
const router = express.Router();

const { getAll, getOne, getReplyComment, getByArticalId, createOne, createReply, updateOne, deleteOne } = require('../controller/comments');

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/get-reply/:commentId', getReplyComment);
router.get('/comments-by-artical/:articalId', getByArticalId);
router.post('/create-reply', createReply);
router.post('/', createOne);
router.put('/:id', updateOne)
router.delete('/:id', deleteOne)


module.exports = router;