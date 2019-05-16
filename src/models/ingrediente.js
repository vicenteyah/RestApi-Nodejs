const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'killer100',
    database: 'Pizza'
});

let ingredienteModel = {};

ingredienteModel.getIngrediente = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM ingredientes ORDER BY id',
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

ingredienteModel.insertIngrediente = (ingredienteData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO ingredientes SET ?', ingredienteData,
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

ingredienteModel.updateIngrediente = (ingredienteData, callback) => {
    if(connection){
        const sql = `
        UPDATE ingredientes SET
        id_proveedor = ${connection.escape(ingredienteData.id_proveedor)},
        nombre =  ${connection.escape(ingredienteData.nombre)}
        WHERE id = ${connection.escape(ingredienteData.id)}
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

ingredienteModel.deleteIngrediente = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM ingredientes WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM ingredientes WHERE id = ${id}
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

module.exports = ingredienteModel;