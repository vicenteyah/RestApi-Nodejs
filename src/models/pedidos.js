const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Narukefan1!',
    database: 'Pizza'
});

let pedidosModel = {};

pedidosModel.getPedidos = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM pedido ORDER BY id',
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

pedidosModel.insertPedidos = (pedidosData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO pedido SET ?', pedidosData,
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

pedidosModel.updatePedidos = (pedidosData, callback) => {
    if(connection){
        const sql = `
        UPDATE pedido SET
        id_pizza =  ${connection.escape(pedidosData.id_pizza)},
        id_tamano = ${connection.escape(pedidosData.id_tamano)},
        id_ingrediente = ${connection.escape(pedidosData.id_ingrediente)},
        precio = ${connection.escape(pedidosData.precio)},
        id_cliente = ${connection.escape(pedidosData.id_cliente)},
        id_empleado = ${connection.escape(pedidosData.id_empleado)}
        WHERE id = ${connection.escape(pedidosData.id)}
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

pedidosModel.deletePedidos = (id, callback) => {
    if(connection){
        let sql = `
        SELECT * FROM pedido WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM pedido WHERE id = ${id}
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

module.exports = pedidosModel;