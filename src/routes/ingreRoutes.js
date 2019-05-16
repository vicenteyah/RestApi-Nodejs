const ingrediente = require('../models/ingrediente');

module.exports = function (app){

    app.get('/ingredientes', (req, res) => {
        ingrediente.getIngrediente((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/ingredientes', (req, res) => {
        const ingredienteData = {
            id: null,
            id_proveedor: req.body.id_proveedor,
            nombre: req.body.nombre
        };

        ingrediente.insertIngrediente(ingredienteData, (err, data) => {
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

    app.put('/ingredientes/:id', (req, res) => {
        const ingredienteData = {
            id: req.params.id,
            id_proveedor: req.body.id_proveedor,
            nombre: req.body.nombre
        };

        ingrediente.updateIngrediente(ingredienteData, (err, data) => {
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

    app.delete('/ingredientes/:id', (req, res) => {
        ingrediente.deleteIngrediente(req.params.id, (err, data) => {
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