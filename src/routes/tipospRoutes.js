const tiposp = require('../models/tiposp');

module.exports = function (app){

    app.get('/tipos_pizza', (req, res) => {
        tiposp.getTiposp((err, data) => {
            res.status(200).json(data);
        });
    });

    app.get('/tipos_pizza/:id',(req,res)=>{
       var id = req.params.id
       tiposp.getOneTiposp(id,(err,data)=>{
           res.status(200).json(data)
       })
    });

    app.post('/tipos_pizza', (req, res) => {
        const tipospData = {
            id: null,
            nombre: req.body.nombre
        };

        tiposp.insertTiposp(tipospData, (err, data) => {
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

    app.put('/tipos_pizza/:id', (req, res) => {
        const tipospData = {
            id: req.params.id,
            nombre: req.body.nombre
        };

        tiposp.updateTiposp(tipospData, (err, data) => {
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

    app.delete('/tipos_pizza/:id', (req, res) => {
        tiposp.deleteTiposp(req.params.id, (err, data) => {
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