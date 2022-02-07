const express = require('express');
const { homePage, CreateUser, allUser, Login, OneUser } = require('../Controller/userController');
const upload = require('../Middlewares/multer');
const router = express.Router()


//homepage
router.get('/',homePage)
router.get('/all',allUser)
router.get('/user/:id',OneUser)


router.post('/add-user', upload.single("pic"),CreateUser)
router.post('/login',Login)


module.exports = router