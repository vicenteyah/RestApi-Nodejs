const User = require('../models/user');

module.exports = function (app){

    app.get('/clientes', (req, res) => {
        User.getUser((err, data) => {
            res.status(200).json(data);
        });
    });

    app.get('/clientes/:id',(req,res)=>{
        var id = req.params.id
        User.getanUser(id,(err,data)=>{
           res.status(200).json(data);
        })
    });


    app.post('/clientes', (req, res) => {
        const userData = {
            id: null,
            nombre: req.body.nombre,
            apaterno: req.body.apaterno,
            amaterno: req.body.amaterno,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        };

        User.insertUser(userData, (err, data) => {
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

    app.put('/clientes/:id', (req, res) => {
        const userData = {
            id: req.params.id,
            nombre: req.body.nombre,
            apaterno: req.body.apaterno,
            amaterno: req.body.amaterno,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        };

        User.updateUser(userData, (err, data) => {
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

    app.delete('/clientes/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, data) => {
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