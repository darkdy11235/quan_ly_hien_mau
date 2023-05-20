const express = require('express');
const router = express.Router();
const nguoiDungController = require('../controllers/nguoiDung.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


const { createNguoiDungSchema, updateNguoiDungSchema, validateLogin } = require('../middleware/validators/nguoiDungValidator.middleware');


router.get('/', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.getAllNguoiDung)); 
router.get('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.getNguoiDungById)); 
router.get('/ten_dang_nhap/:ten_dang_nhap', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.getNguoiDungByTenDangNhap));  
router.get('/whoami', auth(), awaitHandlerFactory(nguoiDungController.getCurrentNguoiDung));  
router.post('/', createNguoiDungSchema, awaitHandlerFactory(nguoiDungController.createNguoiDung)); 
router.patch('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), updateNguoiDungSchema, awaitHandlerFactory(nguoiDungController.updateNguoiDung)); 
router.delete('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.deleteNguoiDung)); 

// get login ejs
router.get('/login', (req, res) => {
    res.render('auth/login');
  });

// post login ejs
router.post('/login', (req, res) => {
        validateLogin
        awaitHandlerFactory(nguoiDungController.nguoiDungLogin)
        auth()
        res.redirect('/api/v1/nguoiDung/whoami');
        
});

module.exports = router;