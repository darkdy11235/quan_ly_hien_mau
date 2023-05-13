const NguoiDungModel = require('../models/nguoiDung.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              NguoiDung Controller
 ******************************************************************************/
class NguoiDungController {
    getAllNguoiDung = async (req, res, next) => {
        let nguoiDungList = await NguoiDungModel.find();
        if (!nguoiDungList.length) {
            throw new HttpException(404, 'NguoiDung not found');
        }

        nguoiDungList = nguoiDungList.map(nguoiDung => {
            const { mat_khau, ...nguoiDungWithoutPassword } = nguoiDung;
            return nguoiDungWithoutPassword;
        });

        res.send(nguoiDungList);
    };

    getNguoiDungById = async (req, res, next) => {
        const nguoiDung = await NguoiDungModel.findOne({ ma_nguoi_dung: req.params.ma_nguoi_dung });
        if (!nguoiDung) {
            throw new HttpException(404, 'NguoiDung not found');
        }
        const { mat_khau, ...nguoiDungWithoutPassword } = nguoiDung;

        res.send(nguoiDungWithoutPassword);
    };

    getNguoiDungByTenDangNhap = async (req, res, next) => {
        const nguoiDung = await NguoiDungModel.findOne({ ten_dang_nhap: req.params.ten_dang_nhap });
        if (!nguoiDung) {
            throw new HttpException(404, 'NguoiDung not found');
        }

        const { mat_khau, ...nguoiDungWithoutPassword } = nguoiDung;

        res.send(nguoiDungWithoutPassword);
    };

    getCurrentNguoiDung = async (req, res, next) => {
        const nguoiDung = await NguoiDungModel.findOne({ ma_nguoi_dung: req.currentUser.ma_nguoi_dung });
        if (!nguoiDung) {
            throw new HttpException(404, 'NguoiDung not found');
        }

        const { mat_khau, ...nguoiDungWithoutPassword } = nguoiDung;

        res.send(nguoiDungWithoutPassword);
    };

    createNguoiDung = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const {xac_nhan_mat_khau, ...restOfReqBody} = req.body;
        const result = await NguoiDungModel.create(restOfReqBody);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('NguoiDung was created!');
    };

    updateNguoiDung = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { xac_nhan_mat_khau, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await NguoiDungModel.update(restOfUpdates, req.params.ma_nguoi_dung);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'NguoiDung not found' :
            affectedRows && changedRows ? 'NguoiDung updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteNguoiDung = async (req, res, next) => {
        if (req.currentUser.ma_nguoi_dung == req.params.ma_nguoi_dung) {
            throw new HttpException(400, 'You can\'t delete yourself');
        }
        const result = await NguoiDungModel.delete(req.params.ma_nguoi_dung);
        if (!result) {
            throw new HttpException(404, 'NguoiDung not found');
        }
        res.send('NguoiDung has been deleted');
    };

    nguoiDungLogin = async (req, res, next) => {
        this.checkValidation(req);
        const { ten_dang_nhap, mat_khau: mk } = req.body;
        const nguoiDung = await NguoiDungModel.findOne({ ten_dang_nhap });

        if (!nguoiDung) {
            throw new HttpException(401, 'Unable to login!');
        }
        const isMatch = await bcrypt.compare(mk, nguoiDung.mat_khau);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }
        // nguoiDung matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ ma_nguoi_dung: nguoiDung.ma_nguoi_dung.toString() }, secretKey, {
            expiresIn: '24h'
        });

        // remove mat_khau from response
        const { mat_khau: mat_khau, ...nguoiDungWithoutPassword } = nguoiDung;

        res.send({ ...nguoiDungWithoutPassword, token });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.mat_khau) {
            req.body.mat_khau = await bcrypt.hash(req.body.mat_khau, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new NguoiDungController;