require('dotenv').config();
const db=require('./connection');
const getUsers=()=>{
    db.query('SELECT * FROM customers',(error,result,fields)=>{
    if(error) throw error;
    console.log({result});
    })
}
const UpdateUser=()=>{
    db.query('UPDATE customers set name=? WHERE name="Viola"',['johnathan'],(error,result,fields)=>{
        if(error) throw error;
        console.log({result});
        })
}

const deleteUser=()=>{
    
    db.query('DELETE FROM customers WHERE name="siavash"',(error,result,fields)=>{
        if(error) throw error;
        console.log({result});
        })
}
const insertUser=()=>{
    db.query('INSERT INTO customers (name, address) VALUES ("siavash","robot st")',(error,result,fields)=>{
        if(error) throw error;
        console.log({result});
        })

}
insertUser();
getUsers();
deleteUser();
getUsers();