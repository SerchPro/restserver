const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagenCloudinary, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
        validarArchivoSubir,
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        check('id', 'Id invalido').isMongoId(),
        validarCampos
    ],
    actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    check('id', 'Id invalido').isMongoId(),
    validarCampos
], mostrarImagen)

module.exports = router;