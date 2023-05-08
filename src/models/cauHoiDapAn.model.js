const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class CauHoiDapAnModel{
    tableName = 'cau_hoi_dap_an';
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

        // return back the first row (cau_hoi_dap_an)
        return result[0];
    }

    create = async ({ma_cau_hoi, ma_dap_an}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ma_cau_hoi, ma_dap_an) VALUES (?,?)`;

        const result = await query(sql, [ma_cau_hoi, ma_dap_an]);
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

module.exports = new CauHoiDapAnModel;