const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'killer100',
    database: 'Pizza'
});

let productosModel = {};

productosModel.getProductos = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM producto ORDER BY id',
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

productosModel.insertProductos = (productosData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO producto SET ?', productosData,
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

productosModel.updateProductos = (productosData, callback) => {
    if(connection){
        const sql = `
        UPDATE producto SET
        id_proveedor = ${connection.escape(productosData.id_proveedor)},
        nombre =  ${connection.escape(productosData.nombre)},
        existencia_b = ${connection.escape(productosData.existencia_b)},
        disponible_v = ${connection.escape(productosData.disponible_v)}
        WHERE id = ${connection.escape(productosData.id)}
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

productosModel.deleteProductos = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM producto WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM producto WHERE id = ${id}
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

module.exports = productosModel;