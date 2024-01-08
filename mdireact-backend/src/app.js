const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { swaggerOptions } = require('./config/swaggerOptions.js');
const path = require('path');
const helmet = require('helmet');
const agendaRoutes = require('./routes/agendaRoutes');
const bitacoraRoutes = require('./routes/bitacoraRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const tarjetaRoutes = require('./routes/tarjetaRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const mantenimientoRoutes = require('./routes/mantenimientoRoutes');
const boletasRoutes = require('./routes/boletasRoutes');
const facturasRoutes = require('./routes/facturasRoutes');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const z = require('zod');
const multer = require('multer');

dotenv.config();
const specs = swaggerJSDoc(swaggerOptions);
const app = express();
app.use(helmet());

app.use(cors({
  origin: '*', 
  methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(agendaRoutes);
app.use(bitacoraRoutes);
app.use(boletasRoutes);
app.use(clientesRoutes);
app.use(facturasRoutes);
app.use(inventarioRoutes);
app.use(tecnicoRoutes);
app.use(tarjetaRoutes);
app.use(mantenimientoRoutes);

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
const uploadb = require("./middlewares/subir_boleta");
const uploadf = require("./middlewares/subir_factura");

app.post('/subir/bitacora', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send('File uploaded successfully');
});

app.post('/subir/boleta', uploadb.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send('File uploaded successfully');
});

app.post('/subir/factura', uploadf.single('file'), (req, res) => {
    // Check if a file was provided
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send('File uploaded successfully');
}
);

app.post('/subir/grabacion', upload.single('file'), (req, res) => {
  const fileBuffer = req.file.buffer;
  res.json({ message: 'File uploaded successfully' });
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send('Multer error: ' + err.message);
    } else {
        next(err);
    }
});

app.use('/docs/', swaggerUI.serve, swaggerUI.setup(specs));

const indexPath = path.join(__dirname, 'index.html');
const imageError = path.join(__dirname, 'images', 'ImagenNoDisponible.png');

app.use('/images/404',(req, res) => res.sendFile(imageError));

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.info('Puerto levantado y trabajando =>>', port);
});
