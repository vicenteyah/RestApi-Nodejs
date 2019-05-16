const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'killer100',
    database: 'Pizza'
});

let tipospModel = {};

tipospModel.getTiposp = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM tipos_pizza ORDER BY id',
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

tipospModel.getOneTiposp = (id, callback)=>{
    if (connection){
        console.log(id)
        connection.query(`SELECT * FROM tipos_pizza WHERE id = '${id}'`,(err,rows)=>{
            if(err){
                throw err;
            }else{
                callback(null,rows)
            }
        });
    }
};

tipospModel.insertTiposp = (tipospData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO tipos_pizza SET ?', tipospData,
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

tipospModel.updateTiposp = (tipospData, callback) => {
    if(connection){
        const sql = `
        UPDATE tipos_pizza SET
        nombre =  ${connection.escape(tipospData.nombre)}
        WHERE id = ${connection.escape(tipospData.id)}
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

tipospModel.deleteTiposp = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM tipos_pizza WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM tipos_pizza WHERE id = ${id}
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

module.exports = tipospModel;