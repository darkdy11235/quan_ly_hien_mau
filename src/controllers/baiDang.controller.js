const BaiDangModel = require('../models/baiDang.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
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

        baiDangList = baiDangList.map(baiDang => {
            const { password, ...baiDangWithoutPassword } = baiDang;
            return baiDangWithoutPassword;
        });

        res.send(baiDangList);
    };

    getBaiDangById = async (req, res, next) => {
        const baiDang = await BaiDangModel.findOne({ id: req.params.id });
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }

        const { password, ...baiDangWithoutPassword } = baiDang;

        res.send(baiDangWithoutPassword);
    };

    getBaiDangBybaiDangName = async (req, res, next) => {
        const baiDang = await BaiDangModel.findOne({ baiDangname: req.params.baiDangname });
        if (!baiDang) {
            throw new HttpException(404, 'BaiDang not found');
        }

        const { password, ...baiDangWithoutPassword } = baiDang;

        res.send(baiDangWithoutPassword);
    };

    getCurrentBaiDang = async (req, res, next) => {
        const { password, ...baiDangWithoutPassword } = req.currentBaiDang;

        res.send(baiDangWithoutPassword);
    };

    createBaiDang = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await BaiDangModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('BaiDang was created!');
    };

    updateBaiDang = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await BaiDangModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'BaiDang not found' :
            affectedRows && changedRows ? 'BaiDang updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteBaiDang = async (req, res, next) => {
        const result = await BaiDangModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'BaiDang not found');
        }
        res.send('BaiDang has been deleted');
    };

    baiDangLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email, password: pass } = req.body;

        const baiDang = await BaiDangModel.findOne({ email });

        if (!baiDang) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, baiDang.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // baiDang matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ baiDang_id: baiDang.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...baiDangWithoutPassword } = baiDang;

        res.send({ ...baiDangWithoutPassword, token });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new BaiDangController;