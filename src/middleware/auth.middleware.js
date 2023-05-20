const HttpException = require('../utils/HttpException.utils');
const nguoiDungModel = require('../models/nguoiDung.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...quyen) => {
    return async function (req, res, next) {
        try {
            console.log(req.headers.authorization);
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";
            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const nguoiDung = await nguoiDungModel.findOne({ ma_nguoi_dung: decoded.ma_nguoi_dung });
            if (!nguoiDung) {
                throw new HttpException(401, 'Authentication failed!');
            }

            // check if the current nguoiDung is the owner nguoiDung
            const ownerAuthorized = req.params.ma_nguoi_dung == nguoiDung.ma_nguoi_dung;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized && quyen.length && !quyen.includes(nguoiDung.quyen)) {
                // not have permissions
                throw new HttpException(401, 'Unauthorized - You are not the QuanTriVien');
            }

            // if the user has permissions
            req.currentUser = nguoiDung;
            console.log(req.currentUser);
            next();
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;