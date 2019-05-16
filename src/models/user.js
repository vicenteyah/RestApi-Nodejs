const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'killer100',
    database: 'Pizza'
});

let userModel = {};

userModel.getUser = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM clientes ORDER BY id',
            (err, rows) => {
                if(err){
                    throw err;
                }else{
                    callback(null, rows);
                }
            }
        )
    }
};
userModel.getanUser = (id , callback)=>{
    if(connection){
        console.log(id)
        connection.query(`SELECT * FROM clientes WHERE id ='${id}'`,(err,rows)=>{
           if(err){
               throw err;
           }else{
               callback(null,rows)
           }
        });
    }
};

userModel.insertUser = (userData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO clientes SET ?', userData,
            (err, result) => {
                if(err){
                    throw err;
                }else{
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
}

userModel.updateUser = (userData, callback) => {
    if(connection){
        const sql = `
        UPDATE clientes SET
        nombre =  ${connection.escape(userData.nombre)},
        apaterno = ${connection.escape(userData.apaterno)},
        amaterno = ${connection.escape(userData.amaterno)},
        telefono = ${connection.escape(userData.telefono)},
        direccion = ${connection.escape(userData.direccion)}
        WHERE id = ${connection.escape(userData.id)}
        `
        connection.query(sql, (err, result) => {
            if(err){
                throw err;
            }else {
                callback(null, {
                    "msg":"success"
                });
            }
        });
    }
};

userModel.deleteUser = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM clientes WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM clientes WHERE id = ${id}
                `;
                connection.query(sql, (err, result) => {
                    if(err){
                        throw err;
                    }else{
                        callback(null, {
                            msg:'deleted'
                        })
                    }
                })
            }else{
                callback(null, {
                    msg: 'not exists'
                })
            }
        });
    }
};

module.exports = userModel;