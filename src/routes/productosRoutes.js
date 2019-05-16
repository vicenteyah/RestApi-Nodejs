const productos = require('../models/productos');

module.exports = function (app){

    app.get('/producto', (req, res) => {
        productos.getProductos((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/producto', (req, res) => {
        const productosData = {
            id: null,
            id_proveedor: req.body.id_proveedor,
            nombre: req.body.nombre,
            existencia_b: req.body.existencia_b,
            disponible_v: req.body.disponible_v,
        };

        productos.insertProductos(productosData, (err, data) => {
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

    app.put('/producto/:id', (req, res) => {
        const productosData = {
            id: req.params.id,
            id_proveedor: req.body.id_proveedor,
            nombre: req.body.nombre,
            existencia_b: req.body.existencia_b,
            disponible_v: req.body.disponible_v,
        };

        productos.updateProductos(productosData, (err, data) => {
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

    app.delete('/producto/:id', (req, res) => {
        productos.deleteProductos(req.params.id, (err, data) => {
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