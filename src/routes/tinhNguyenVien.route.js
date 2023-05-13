const express = require('express');
const router = express.Router();
const tinhNguyenVienController = require('../controllers/tinhNguyenVien.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/tinhNguyenVienQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createTinhNguyenVienSchema, updateTinhNguyenVienSchema, validateLogin } = require('../middleware/validators/tinhNguyenVienValidator.middleware');


router.get('/', auth(Role.QTV), awaitHandlerFactory(tinhNguyenVienController.getAllTinhNguyenVien));
router.get('/ma_tinh_nguyen_vien/:ma_tinh_nguyen_vien', auth(Role.QTV, Role.DVTC), awaitHandlerFactory(tinhNguyenVienController.getTinhNguyenVienById)); 
router.get('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV, Role.DVTC), awaitHandlerFactory(tinhNguyenVienController.getTinhNguyenVienByMaNguoiDung));
router.get('/whoami', auth(), awaitHandlerFactory(tinhNguyenVienController.getCurrentTinhNguyenVien));
router.post('/', createTinhNguyenVienSchema, awaitHandlerFactory(tinhNguyenVienController.createTinhNguyenVien));
router.patch('/ma_tinh_nguyen_vien/:ma_tinh_nguyen_vien', auth(), updateTinhNguyenVienSchema, awaitHandlerFactory(tinhNguyenVienController.updateTinhNguyenVien));
router.delete('/ma_tinh_nguyen_vien/:ma_tinh_nguyen_vien', auth(Role.QTV, Role.DVTC), awaitHandlerFactory(tinhNguyenVienController.deleteTinhNguyenVien));

module.exports = router;