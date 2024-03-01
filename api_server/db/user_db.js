// const mysql=require("mysql2");
import mysql from "mysql2";

const pool=mysql.createPool({
    host:"127.0.0.1",
    user:'root',
    password:'wjw18986797752',
    database:'my_db_01'
})

console.log('连接成功')

export default pool.promise();

// const user={id:"5",password:"123",username:"wuxi"};

// const sqlStr="insert into users set ?"


// db.query(sqlStr,user,(error,result)=>{
//     if(error) return console.log(error.message);
//     // console.log(result);
// })


