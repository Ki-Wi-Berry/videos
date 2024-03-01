import db from "../db/user_db.js";

export async function checkIfExists(table, field, value) {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT COUNT(*) AS count FROM ${table} WHERE ${field} = ?`;
      let [result] = await db.query(sql, [value]);
    //   console.log(result[0].count)
      resolve(result[0].count > 0);
    } catch (err) {
      reject(err);
    }
  });
}

export async function addColumnIfNotExists(tableName, columnName, columnType){
    try{
        const checkColumnQuery = `SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = 'my_db_01' AND table_name = '${tableName}' AND column_name = '${columnName}'`;
        const [checkColumnResult] = await db.query(checkColumnQuery)
        // console.log(checkColumnResult)
        const describeTableQuery = "DESCRIBE user";
        const [describeResult] =  await db.query(describeTableQuery)
        console.log(describeResult)
        if(checkColumnResult[0].count === 0){
            const alterTableQuery = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;
            await db.query(alterTableQuery)
        }
    } catch (err){
        console.log(err)
    }
}
