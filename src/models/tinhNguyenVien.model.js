const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class TinhNguyenVienModel{
    tableName = 'tinh_nguyen_vien';
    primaryKeyName = 'ma_tinh_nguyen_vien';

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

        // return back the first row (tinh_nguyen_vien)
        return result[0];
    }

    create = async ({ten_tnv, cmnd_cccd, ngay_sinh, gioi_tinh, so_dien_thoai, email, nghe_nghiep, ma_dia_chi_cu_the, ma_nhom_mau, ma_nguoi_dung}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ten_tnv, cmnd_cccd, ngay_sinh, gioi_tinh, so_dien_thoai, email, nghe_nghiep, ma_dia_chi_cu_the, ma_nhom_mau, ma_nguoi_dung) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [ten_tnv, cmnd_cccd, ngay_sinh, gioi_tinh, so_dien_thoai, email, nghe_nghiep, ma_dia_chi_cu_the, ma_nhom_mau, ma_nguoi_dung]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${this.primaryKeyName} = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE ${this.primaryKeyName} = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TinhNguyenVienModel;