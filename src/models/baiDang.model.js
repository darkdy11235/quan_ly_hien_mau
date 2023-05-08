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