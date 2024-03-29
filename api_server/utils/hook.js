import db from "../db/user_db.js";
import child_process from 'child_process'
import jwt from "jsonwebtoken";
import path from 'path'
import fs from 'fs'
import config from "../config.js";
const {exec} = child_process



// 查询特定表特定列中某一值是否存在
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

// 在某一表中添加列
export async function addColumnIfNotExists(tableName, columnName, columnType){
    try{
        const checkColumnQuery = `SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = 'my_db_01' AND table_name = '${tableName}' AND column_name = '${columnName}'`;
        const [checkColumnResult] = await db.query(checkColumnQuery)
        // console.log(checkColumnResult)
        const describeTableQuery = "DESCRIBE user";
        const [describeResult] =  await db.query(describeTableQuery)
        // console.log(describeResult)
        if(checkColumnResult[0].count === 0){
            const alterTableQuery = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;
            await db.query(alterTableQuery)
        }
    } catch (err){
        console.log(err)
    }
}

// 从token拿用户数据
export function GetUserInfoFromToken(req){
  try{
    const token = req.headers.authorization;
    if(!token) return false
    const userInfo = jwt.verify(token, config.jwtSecretKey);
    if(!userInfo) return false
    return userInfo
  } catch{
    return false
  }
  
}




