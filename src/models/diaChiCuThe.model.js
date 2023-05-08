const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class DiaChiCuTheModel{
    tableName = 'dia_chi_cu_the';
    primaryKeyName = 'ma_dia_chi_cu_the';

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

        // return back the first row (dia_chi_cu_the)
        return result[0];
    }

    create = async ({dia_chi, ma_phuong_xa}) => {
        const sql = `INSERT INTO ${this.tableName}
        (dia_chi, ma_phuong_xa) VALUES (?,?)`;

        const result = await query(sql, [dia_chi, ma_phuong_xa]);
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

module.exports = new DiaChiCuTheModel;