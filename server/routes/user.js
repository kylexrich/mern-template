const express = require('express');
const router = express.Router();

const {
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.put('/:userId', (req, res) => {
  updateUser(req, res);
});

router.delete('/:userId', (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
