const empleado = require('../models/empleado');

module.exports = function (app){

    app.get('/empleados', (req, res) => {
        empleado.getEmpleado((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/empleados', (req, res) => {
        const empleadoData = {
            id: null,
            usuario: req.body.usuario,
            contraseña: req.body.contraseña
        };

        empleado.insertEmpleado(empleadoData, (err, data) => {
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

    app.put('/empleados/:id', (req, res) => {
        const empleadoData = {
            id: req.params.id,
            usuario: req.body.usuario,
            contraseña: req.body.contraseña
        };

        empleado.updateEmpleado(empleadoData, (err, data) => {
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

    app.delete('/empleados/:id', (req, res) => {
        empleado.deleteEmpleado(req.params.id, (err, data) => {
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