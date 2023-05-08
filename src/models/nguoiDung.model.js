const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class NguoiDungModel{
    tableName = 'nguoi_dung';
    primaryKeyName = 'ma_nguoi_dung';

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
        // return back the first row (nguoi_dung)
        return result[0];
    }

    create = async ({ten_dang_nhap, mat_khau, trang_thai, quyen}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ten_dang_nhap, mat_khau, trang_thai, quyen) VALUES (?,?,?,?)`;

        const result = await query(sql, [ten_dang_nhap, mat_khau, trang_thai, quyen]);
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

module.exports = new NguoiDungModel;