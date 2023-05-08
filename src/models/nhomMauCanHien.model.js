const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class NhomMauCanHienModel{
    tableName = 'nhom_mau_can_hien';
    primaryKeyName = ['ma_benh' , 'ma_mau']; 

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

        // return back the first row (nhom_mau_can_hien)
        return result[0];
    }

    create = async ({ma_nhom_mau, ma_bai_dang, so_luong}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ma_nhom_mau, ma_bai_dang, so_luong) VALUES (?,?)`;

        const result = await query(sql, [ma_nhom_mau, ma_bai_dang, so_luong]);
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

module.exports = new NhomMauCanHienModel;