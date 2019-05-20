const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Narukefan1!',
    database: 'Pizza'
});

let proveedorModel = {};

proveedorModel.getProveedor = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM proveedores ORDER BY id',
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
proveedorModel.getAproveedor = (id, callback) => {
    if (connection) {
        console.log(id)
        connection.query(`SELECT * FROM proveedores WHERE id='${id}'`, (err,rows) => {
            if (err) {
               throw err;
            } else {
                callback(null,rows);
            }
        });
    }
};
proveedorModel.insertProveedor = (proveedorData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO proveedores SET ?', proveedorData,
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

proveedorModel.updateProveedor = (proveedorData, callback) => {
    if(connection){
        const sql = `
        UPDATE proveedores SET
        nombre =  ${connection.escape(proveedorData.nombre)},
        cantidad_kg = ${connection.escape(proveedorData.cantidad_kg)},
        direccion = ${connection.escape(proveedorData.direccion)},
        telefono = ${connection.escape(proveedorData.telefono)},
        total_p = ${connection.escape(proveedorData.total_p)}
        WHERE id = ${connection.escape(proveedorData.id)}
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

proveedorModel.deleteProveedor = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM proveedores WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM proveedores WHERE id = ${id}
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

module.exports = proveedorModel;