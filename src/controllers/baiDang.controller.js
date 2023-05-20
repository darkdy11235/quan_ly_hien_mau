const BaiDangModel = require('../models/baiDang.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              BaiDang Controller
 ******************************************************************************/
class BaiDangController {
    getAllBaiDang = async (req, res, next) => {
        let baiDangList = await BaiDangModel.find();
        if (!baiDangList.length) {
            throw new HttpException(404, 'BaiDang not found');
        }
        res.send(baiDangList);
    };

    getBaiDangByDVTC = async (req, res, next) => {
        const baiDang = await BaiDangModel.findBaiDangByMaDVTC({ ma_dvtc: req.params.ma_dvtc});
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }

        res.send(baiDang);
    };

    getBaiDangByTNV = async (req, res, next) => {
        const baiDang = await BaiDangModel.findBaiDangByMaTNV({ ma_tnv: req.params.ma_tnv });
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }

        res.send(baiDang);
    };

    getBaiDangById = async (req, res, next) => {
        const baiDang = await BaiDangModel.findOne({ ma_bai_dang: req.params.ma_bai_dang });
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }

        res.send(baiDang);
    };

    getBaiDangBybaiDangName = async (req, res, next) => {
        const baiDang = await BaiDangModel.findOne({ baiDangname: req.params.baiDangname });
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }

        res.send(baiDang);
    };

    getBaiDangByTime = async (req, res, next) => {
        const baiDang = await BaiDangModel.findBaiDangByTime({ ngay_bat_dau: req.params.ngay_bat_dau,  ngay_ket_thuc: req.params.ngay_ket_thuc  });
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }
        console.log(req.params)

        res.send(baiDang);
    };

    createBaiDang = async (req, res, next) => {

        const result = await BaiDangModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('BaiDang was created!');
    };

    updateBaiDang = async (req, res, next) => {

        // do the update query and get the result
        // it can be partial edit
        const result = await BaiDangModel.update(req.body, req.params.ma_bai_dang);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'BaiDang not found' :
            affectedRows && changedRows ? 'BaiDang updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteBaiDang = async (req, res, next) => {
        const result = await BaiDangModel.delete(req.params.ma_bai_dang);
        if (!result) {
            throw new HttpException(404, 'BaiDang not found');
        }
        res.send('BaiDang has been deleted');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new BaiDangController;