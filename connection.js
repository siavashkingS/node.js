const mysql=require('mysql');
const connection=mysql.createConnection({
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
});
connection.connect(err=>{
    if(err){
        console.log('something went wrong',err.message);
        return;
    }
})
module.exports=connection;