const TinhNguyenVienModel = require('../models/tinhNguyenVien.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              TinhNguyenVien Controller
 ******************************************************************************/
class TinhNguyenVienController {
    getAllTinhNguyenVien = async (req, res, next) => {
        let tinhNguyenVienList = await TinhNguyenVienModel.find();
        if (!tinhNguyenVienList.length) {
            throw new HttpException(404, 'TinhNguyenVien not found');
        }

        tinhNguyenVienList = tinhNguyenVienList.map(tinhNguyenVien => {
            const { mat_khau, ...tinhNguyenVienWithoutPassword } = tinhNguyenVien;
            return tinhNguyenVienWithoutPassword;
        });

        res.send(tinhNguyenVienList);
    };

    getTinhNguyenVienById = async (req, res, next) => {
        const tinhNguyenVien = await TinhNguyenVienModel.findOne({ ma_tnv: req.params.ma_tnv });
        if (!tinhNguyenVien) {
            throw new HttpException(404, 'TinhNguyenVien not found');
        }
        const { mat_khau, ...tinhNguyenVienWithoutPassword } = tinhNguyenVien;

        res.send(tinhNguyenVienWithoutPassword);
    };

    getTinhNguyenVienByMaNguoiDung = async (req, res, next) => {
        const tinhNguyenVien = await TinhNguyenVienModel.findOne({ ma_nguoi_dung: req.params.ma_nguoi_dung });
        if (!tinhNguyenVien) {
            throw new HttpException(404, 'TinhNguyenVien not found');
        }
        const { mat_khau, ...tinhNguyenVienWithoutPassword } = tinhNguyenVien;
        res.send(tinhNguyenVienWithoutPassword);
    };


    getCurrentTinhNguyenVien = async (req, res, next) => {
        const tinhNguyenVien = await TinhNguyenVienModel.findOne({ ma_nguoi_dung: req.currentUser.ma_nguoi_dung });
        if (!tinhNguyenVien) {
            throw new HttpException(404, 'TinhNguyenVien not found');
        }

        const { mat_khau, ...tinhNguyenVienWithoutPassword } = tinhNguyenVien;

        res.send(tinhNguyenVienWithoutPassword);
    };

    createTinhNguyenVien = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const {xac_nhan_mat_khau, ...restOfReqBody} = req.body;
        const result = await TinhNguyenVienModel.create(restOfReqBody);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('TinhNguyenVien' + result.ma_tnv + ' was created!');
    };

    updateTinhNguyenVien = async (req, res, next) => {
        this.checkValidation(req);
        const tinhNguyenVien = await TinhNguyenVienModel.findOne({ ma_nguoi_dung: req.currentUser.ma_nguoi_dung });
        if (tinhNguyenVien.ma_tnv != req.params.ma_tnv || req.currentUser.quyen != Quyen.QTV) {
            throw new HttpException(400, 'Permission denied, only QuanTriVien and the owner can update this account');
        }
        await this.hashPassword(req);

        const { xac_nhan_mat_khau, ...restOfUpdates } = req.body;

        const result = await TinhNguyenVienModel.update(restOfUpdates, req.params.ma_tnv);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'TinhNguyenVien not found' :
            affectedRows && changedRows ? 'TinhNguyenVien updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteTinhNguyenVien = async (req, res, next) => {
        const tinhNguyenVien = await TinhNguyenVienModel.findOne({ ma_nguoi_dung: req.currentUser.ma_nguoi_dung });
        if (tinhNguyenVien.ma_tnv == req.params.ma_tnv) {
            throw new HttpException(400, 'You can\'t delete yourself');
        }
        if (req.currentUser.quyen != Quyen.QTV) {
            throw new HttpException(400, 'Permission denied, only QuanTriVien can delete account');
        }
        const result = await TinhNguyenVienModel.delete(req.params.ma_tnv);
        if (!result) {
            throw new HttpException(404, 'TinhNguyenVien not found');
        }
        res.send('TinhNguyenVien with ma_tnv ' + req.params.ma_tnv + ' has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new TinhNguyenVienController;