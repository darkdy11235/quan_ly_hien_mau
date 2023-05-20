const express = require('express');
const router = express.Router();
const baiDangController = require('../controllers/baiDang.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.get('/', auth(), awaitHandlerFactory(baiDangController.getAllBaiDang)); 
router.get('/ma_bai_dang/:ma_bai_dang', auth(), awaitHandlerFactory(baiDangController.getBaiDangById)); 
router.get('/ma_dvtc/:ma_dvtc', auth(), awaitHandlerFactory(baiDangController.getBaiDangByDVTC)); 
router.get('/ngay_bat_dau/:ngay_bat_dau/ngay_ket_thuc/:ngay_ket_thuc', auth(), awaitHandlerFactory(baiDangController.getBaiDangByTime)); 
router.get('/ma_tnv/:ma_tnv', auth(), awaitHandlerFactory(baiDangController.getBaiDangByTNV)); 
router.post('/', awaitHandlerFactory(baiDangController.createBaiDang)); 
router.patch('/ma_bai_dang/:ma_bai_dang', auth(), awaitHandlerFactory(baiDangController.updateBaiDang)); 
router.delete('/ma_bai_dang/:ma_bai_dang', auth(), awaitHandlerFactory(baiDangController.deleteBaiDang)); 

module.exports = router;