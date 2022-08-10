import db from "../db/demo.js"

export async function getAllUser(req, res) {
    try{
        const sqlStr="select username,xxx from users"; 
        const [rows] = await db.query(sqlStr); 
        res.send({
            status:0,
            message:"获取成功",
            data:rows
        })
    }catch(err){
        res.send({
            status:1,
            message:"请求失败",
            desc:err.message
        })
        
    }
    
}

