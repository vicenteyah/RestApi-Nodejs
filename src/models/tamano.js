const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Narukefan1!',
    database: 'Pizza'
});

let tamanoModel = {};

tamanoModel.getTamano = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM tamano ORDER BY id',
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

tamanoModel.insertTamano = (tamanoData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO tamano SET ?', tamanoData,
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

tamanoModel.updateTamano = (tamanoData, callback) => {
    if(connection){
        const sql = `
        UPDATE tamano SET
        tamano =  ${connection.escape(tamanoData.tamano)},
        rebanada = ${connection.escape(tamanoData.rebanada)}
        WHERE id = ${connection.escape(tamanoData.id)}
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

tamanoModel.deleteTamano = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM tamano WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM tamano WHERE id = ${id}
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

module.exports = tamanoModel;