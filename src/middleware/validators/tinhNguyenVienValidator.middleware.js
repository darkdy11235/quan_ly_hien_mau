const { body } = require('express-validator');
const Quyen = require('../../utils/nguoiDungQuyen.utils');

//ten_tnv, cmnd_cccd, ngay_sinh, gioi_tinh, so_dien_thoai, email, nghe_nghiep, ma_dia_chi_cu_the, ma_nhom_mau, ma_nguoi_dung
exports.createTinhNguyenVienSchema = [
    body('ten_tnv')
        .exists()
        .withMessage('ten_tnv is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('cmnd_cccd')
        .exists()
        .withMessage('cmnd_cccd is required')
        .isLength({ min: 9 })
        .withMessage('Must be at least 9 chars long'),
    body('ngay_sinh')
        .exists()
        .withMessage('ngay_sinh is required'),
    body('gioi_tinh')
        .exists()
        .withMessage('gioi_tinh is required')
        .isIn(['Nam', 'Nữ'])
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('so_dien_thoai')
        .exists()
        .withMessage('so_dien_thoai is required')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email'),
    body('nghe_nghiep')
        .exists()
        .withMessage('nghe_nghiep is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('ma_dia_chi_cu_the')
        .exists()
        .withMessage('ma_dia_chi_cu_the is required'),
    body('ma_nhom_mau')
        .exists()
        .withMessage('ma_nhom_mau is required'),
    body('ma_nguoi_dung')
        .exists()
        .withMessage('ma_nguoi_dung is required')

];

exports.updateTinhNguyenVienSchema = [
    body('ten_tnv')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('cmnd_cccd')
        .optional()
        .isLength({ min: 9 })
        .withMessage('Must be at least 9 chars long'),
    body('ngay_sinh')
        .optional(),
    body('gioi_tinh')
        .optional()
        .isIn(['Nam', 'Nữ'])
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('so_dien_thoai')
        .optional()
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('email')
        .optional()
        .isEmail()      
        .normalizeEmail()
        .withMessage('Must be a valid email'),
    body('nghe_nghiep')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('ma_dia_chi_cu_the')
        .optional(),
    body('ma_nhom_mau')
        .optional(),
    body('ma_nguoi_dung')
        .optional()
];