const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'killer100',
    database: 'Pizza'
});

let dempleadoModel = {};

dempleadoModel.getDempleado = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM datos_empleados ORDER BY id',
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

dempleadoModel.insertDempleado = (dempleadoData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO datos_empleados SET ?', dempleadoData,
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

dempleadoModel.updateDempleado = (dempleadoData, callback) => {
    if(connection){
        const sql = `
        UPDATE datos_empleados SET
        nombre =  ${connection.escape(dempleadoData.nombre)},
        apaterno = ${connection.escape(dempleadoData.apaterno)},
        amaterno = ${connection.escape(dempleadoData.amaterno)},
        telefono = ${connection.escape(dempleadoData.telefono)},
        direccion = ${connection.escape(dempleadoData.direccion)}
        WHERE id = ${connection.escape(dempleadoData.id)}
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

dempleadoModel.deleteDempleado = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM datos_empleados WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM datos_empleados WHERE id = ${id}
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

module.exports = dempleadoModel;