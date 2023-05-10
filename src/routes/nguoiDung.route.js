const express = require('express');
const router = express.Router();
const nguoiDungController = require('../controllers/nguoiDung.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createNguoiDungSchema, updateNguoiDungSchema, validateLogin } = require('../middleware/validators/nguoiDungValidator.middleware');


router.get('/', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.getAllNguoiDung)); // localhost:3000/api/v1/users
router.get('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.getNguoiDungById)); // localhost:3000/api/v1/users/id/1
router.get('/ten_dang_nhap/:ten_dang_nhap', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.getNguoiDungByTenDangNhap)); // localhost:3000/api/v1/users/usersname/julia
router.get('/whoami', auth(), awaitHandlerFactory(nguoiDungController.getCurrentNguoiDung)); // localhost:3000/api/v1/users/whoami
router.post('/', createNguoiDungSchema, awaitHandlerFactory(nguoiDungController.createNguoiDung)); // localhost:3000/api/v1/users
router.patch('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), updateNguoiDungSchema, awaitHandlerFactory(nguoiDungController.updateNguoiDung)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.deleteNguoiDung)); // localhost:3000/api/v1/users/id/1

router.post('/login', validateLogin, awaitHandlerFactory(nguoiDungController.nguoiDungLogin)); // localhost:3000/api/v1/users/login

module.exports = router;