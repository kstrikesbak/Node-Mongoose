const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    register,
    login,
    updateProfile,
    deleteProfile
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.put('/updateprofile/:id', updateProfile);
router.delete('/deleteprofile/:id', deleteProfile);

module.exports = router;