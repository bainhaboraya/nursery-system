
const express = require('express');
const router = express.Router();
const { changePassword } = require('./../Controller/teacherController');
router.post('/teacher/change-password', changePassword);

module.exports = router;