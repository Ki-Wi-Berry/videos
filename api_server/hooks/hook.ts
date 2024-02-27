import db from "../db/user_db.js";

export async function checkIfExists(table, field, value) {
  return new Promise(async (resolve, reject) => {
    try{
        const sql = `SELECT COUNT(*) AS count FROM ${table} WHERE ${field} = ?`;
        let result = await (db.query(sql, [value]) as Promise<any[]>);
        resolve(result[0].count > 0)
    } catch (err){
        reject(err)
    }
  });
}
