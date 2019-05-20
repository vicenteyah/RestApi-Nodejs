const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Narukefan1!',
    database: 'Pizza'
});

let empleadoModel = {};

empleadoModel.getEmpleado = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM empleados ORDER BY id',
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

empleadoModel.insertEmpleado = (empleadoData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO empleados SET ?', empleadoData,
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

empleadoModel.updateEmpleado = (empleadoData, callback) => {
    if(connection){
        const sql = `
        UPDATE empleados SET
        usuario =  ${connection.escape(empleadoData.usuario)},
        contraseña = ${connection.escape(empleadoData.contraseña)}
        WHERE id = ${connection.escape(empleadoData.id)}
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

empleadoModel.deleteEmpleado = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM empleados WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM empleados WHERE id = ${id}
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

module.exports = empleadoModel;