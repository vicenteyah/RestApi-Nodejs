const express = require('express');
const app = express ();
const cors = require('cors');

const morgan = require('morgan');
const bodyParser = require('body-parser');


//settings 
const config = require('./config');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//routes
require('./routes/userRoutes')(app);
require('./routes/dempleadoRoutes')(app);
require('./routes/empleadoRoutes')(app);
require('./routes/proveedorRoutes')(app);
require('./routes/ingreRoutes')(app);
require('./routes/tamanoRoutes')(app);
require('./routes/tipospRoutes')(app);
require('./routes/pedidoRoutes')(app);
require('./routes/productosRoutes')(app);

app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);
});