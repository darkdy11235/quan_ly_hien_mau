const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class BaiDangModel{
    tableName = 'bai_dang';
    idName = 'ma_bai_dang';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findBaiDangByMaDVTC = async (ma_dvtc) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE ma_dvtc = ?`;
        return await query(sql, [ma_dvtc]);
    }

    findBaiDangByMaTNV = async (ma_tnv) => { 
        let sql = `SELECT * FROM ${this.tableName} 
                    WHERE ma_bai_dang IN (SELECT ma_bai_dang FROM phieu_dang_ky WHERE ma_tnv = ?)`;
    }

    findBaiDangByMaDVTCAndTrangThai = async (ma_dvtc, trang_thai) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE ma_dvtc = ? AND trang_thai = ?`;

        return await query(sql, [ma_dvtc, trang_thai]);
    }

    findBaiDangByTime = async (ngay_bat_dau, ngay_ket_thuc) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE ngay_hien_mau >= ? AND ngay_hien_mau <= ? and trang_thai <> 'Đã kết thúc'`;

        return await query(sql, [ngay_bat_dau, ngay_ket_thuc]);
    }
        

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (bai_dang)
        return result[0];
    }

    create = async ({ tieu_de, noi_dung, ngay_dang, ngay_hien_mau, gio_bat_dau, gio_ket_thuc, trang_thai, ma_dvtc }) => {
        const sql = `INSERT INTO ${this.tableName}
        (tieu_de, noi_dung, ngay_dang, ngay_hien_mau, gio_bat_dau, gio_ket_thuc, trang_thai, ma_dvtc) VALUES (?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [tieu_de, noi_dung, ngay_dang, ngay_hien_mau, gio_bat_dau, gio_ket_thuc, trang_thai, ma_dvtc]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${this.idName} = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE ${this.idName} = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new BaiDangModel;