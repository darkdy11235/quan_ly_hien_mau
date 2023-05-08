const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class PhuongXaModel{
    tableName = 'phuong_xa';
    primaryKeyName = 'ma_phuong_xa';

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

        // return back the first row (phuong_xa)
        return result[0];
    }

    create = async ({ten_phuong_xa, ma_quan_h}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ten_phuong_xa, ma_quan_h) VALUES (?,?)`;

        const result = await query(sql, [ten_phuong_xa, ma_quan_h]);
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

module.exports = new PhuongXaModel;