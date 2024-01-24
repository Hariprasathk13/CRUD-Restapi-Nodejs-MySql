const mysql=require('mysql2')
const  connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"
})

connection.connect((err)=>{
    if (err) throw err;
    else console.log('db connected successfully!');
})




module.exports={connection};