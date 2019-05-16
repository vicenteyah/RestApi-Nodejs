const proveedor = require('../models/proveedor');

module.exports = function (app){

    app.get('/proveedores', (req, res) => {
        proveedor.getProveedor((err, data) => {
            res.status(200).json(data);
        });
    });

    app.get('/proveedores/:id', (req, res) => {
        var id = req.params.id
        proveedor.getAproveedor(id,(err,data)=>{
            res.status(200).json(data);
        })
    });

    app.post('/proveedores', (req, res) => {
        const proveedorData = {
            id: null,
            nombre: req.body.nombre,
            cantidad_kg: req.body.cantidad_kg,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            total_p: req.body.total_p
        };

        proveedor.insertProveedor(proveedorData, (err, data) => {
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

    app.put('/proveedores/:id', (req, res) => {
        const proveedorData = {
            id: req.params.id,
            nombre: req.body.nombre,
            cantidad_kg: req.body.cantidad_kg,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            total_p: req.body.total_p
        };

        proveedor.updateProveedor(proveedorData, (err, data) => {
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

    app.delete('/proveedores/:id', (req, res) => {
        proveedor.deleteProveedor(req.params.id, (err, data) => {
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