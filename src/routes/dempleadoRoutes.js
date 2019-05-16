const dempleado = require('../models/dempleado');

module.exports = (app)=>{

    app.get('/datos_empleados', (req, res) => {
        dempleado.getDempleado((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/datos_empleados', (req, res) => {
        const dempleadoData = {
            id: null,
            nombre: req.body.nombre,
            apaterno: req.body.apaterno,
            amaterno: req.body.amaterno,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        };

        dempleado.insertDempleado(dempleadoData, (err, data) => {
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

    app.put('/datos_empleados/:id', (req, res) => {
        const dempleadoData = {
            id: req.params.id,
            nombre: req.body.nombre,
            apaterno: req.body.apaterno,
            amaterno: req.body.amaterno,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        };

        dempleado.updateDempleado(dempleadoData, (err, data) => {
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

    app.delete('/datos_empleados/:id', (req, res) => {
        dempleado.deleteDempleado(req.params.id, (err, data) => {
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