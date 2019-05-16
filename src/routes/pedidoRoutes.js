const pedidos = require('../models/pedidos');

module.exports = function (app){

    app.get('/pedido', (req, res) => {
        pedidos.getPedidos((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/pedido', (req, res) => {
        const pedidosData = {
            id: null,
            id_pizza: req.body.id_pizza,
            id_tamano: req.body.id_tamano,
            id_ingrediente: req.body.id_ingrediente,
            precio: req.body.precio,
            id_cliente: req.body.id_cliente,
            id_empleado: req.body.id_empleado
        };

        pedidos.insertPedidos(pedidosData, (err, data) => {
            if (data && data.insertId){
                res.json({
                    success: true,
                    msg: 'Usuario insertado',
                    data: data
                })
            }else{
                res.status(500).json({
                  success : false,
                  msg : 'error'
                })
              }
        })
    });

    app.put('/pedido/:id', (req, res) => {
        const pedidosData = {
            id: req.params.id,
            id_pizza: req.body.id_pizza,
            id_tamano: req.body.id_tamano,
            id_ingrediente: req.body.id_ingrediente,
            precio: req.body.precio,
            id_cliente: req.body.id_cliente,
            id_empleado: req.body.id_empleado
        };

        pedidos.updatePedidos(pedidosData, (err, data) => {
            if(data && data.msg){
                res.json(data)
            }else {
                res.json({
                    success: false,
                    msg: 'error'
                })
            }
        })
    });

    app.delete('/pedido/:id', (req, res) => {
        pedidos.deletePedidos(req.params.id, (err, data) => {
            if(data && data.msg === 'deleted' || data.msg ==='not exists'){
                res.json({
                    success: true,
                    data
                })
            }else{
                res.status(500).json({
                    msg: 'Error'
                })
            }
        })
    })

}