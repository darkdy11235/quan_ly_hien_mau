const { body } = require('express-validator');
const Quyen = require('../../utils/nguoiDungQuyen.utils');

// ten_dang_nhap
// mat_khau
// trang_thai
// quyen

exports.createNguoiDungSchema = [
    body('ten_dang_nhap')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('mat_khau')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters'),
    body('xac_nhan_mat_khau')
        .exists()
        .custom((value, { req }) => value === req.body.mat_khau)
        .withMessage('confirm_password field must have the same value as the password field'),
    body('trang_thai')
        .optional()
        .isIn(['Hoạt động', 'Khóa'])
        .withMessage('Invalid status type'),
    body('quyen')
        .optional()
        .isIn([Quyen.DVTC, Quyen.TNV])
        .withMessage('Invalid Role type')
];

exports.updateNguoiDungSchema = [
    body('ten_dang_nhap')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('mat_khau')
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters'),
    body('trang_thai')
        .optional()
        .isIn(['Hoạt động', 'Khóa'])
        .withMessage('Invalid status type'),
        body('quyen')
        .optional()
        .isIn([Quyen.DVTC, Quyen.TNV])
        .withMessage('Invalid Role type'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['ten_dang_nhap', 'mat_khau','xac_nhan_mat_khau', 'trang_thai', 'quyen'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('ten_dang_nhap')
        .exists()
        .withMessage('username is required'),
    body('mat_khau')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];