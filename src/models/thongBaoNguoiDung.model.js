const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class ThongBaoNguoiDungModel{
    tableName = 'thong_bao_nguoi_dung';
    primaryKeyName = ['ma_cau_hoi' , 'ma_dap_an']; 

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

        // return back the first row (thong_bao_nguoi_dung)
        return result[0];
    }

    create = async ({ma_thong_bao, ma_nguoi_dung, trang_thai}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ma_thong_bao, ma_nguoi_dung, trang_thai) VALUES (?,?)`;

        const result = await query(sql, [ma_thong_bao, ma_nguoi_dung, trang_thai]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, keys) => {
        const { columnSet, values } = multipleColumnSet(params)
        const { columnSetKey, valuesKey } = multipleColumnSet(keys)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${columnSetKey}`;

        const result = await query(sql, [...values, ...valuesKey]);

        return result;
    }

    delete = async (keys) => {
        const { columnSetKey, valuesKey } = multipleColumnSet(keys)
        const sql = `DELETE FROM ${this.tableName}
        WHERE ${columnSetKey}`;
        const result = await query(sql, [...valuesKey]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ThongBaoNguoiDungModel;