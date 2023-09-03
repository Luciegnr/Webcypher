const express = require('express');
const router = express.Router();


router.use('/', require('./audio.routes'));
router.use('/', require('./avatar.routes'));
router.use('/', require('./user.routes'));
router.use('/', require('./room.routes'));
router.use('/', require('./chat/message.routes'));
router.use('/', require('./chat/conversation.routes'));
router.use('/', require('./auth.routes'));
module.exports = router;