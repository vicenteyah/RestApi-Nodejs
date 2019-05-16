const tamano = require('../models/tamano');

module.exports = function (app){

    app.get('/tamano', (req, res) => {
        tamano.getTamano((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/tamano', (req, res) => {
        const tamanoData = {
            id: null,
            tamano: req.body.tamano,
            rebanada: req.body.rebanada
        };

        tamano.insertTamano(tamanoData, (err, data) => {
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

    app.put('/tamano/:id', (req, res) => {
        const tamanoData = {
            id: req.params.id,
            tamano: req.body.tamano,
            rebanada: req.body.rebanada
        };

        tamano.updateTamano(tamanoData, (err, data) => {
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

    app.delete('/tamano/:id', (req, res) => {
        tamano.deleteTamano(req.params.id, (err, data) => {
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