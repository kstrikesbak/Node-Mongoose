const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    register,
    login,
    updateProfile,
    deleteProfile
} = require('../controllers/userController');

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);

module.exports = router;