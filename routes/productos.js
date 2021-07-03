const { Router } = require('express');
const { check } = require('express-validator');
const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actulizarProducto,
    borrarProducto
} = require('../controllers/productos');
const { existeProduto } = require('../helpers/db-validators');
const { existeCategorias } = require('../helpers/existe-categorias');
const { validarJWT, validarCampos, tieneRol } = require('../middlewares');


const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener una categoria por un id -publico
router.get('/:id', [
    check('id', 'No es un id de  Mongo válido').isMongoId(),
    check('id').custom(existeProduto),
    validarCampos
], obtenerProducto);

// Crear categoria - privada - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'la categoria es obligatorio').isMongoId(),
    check('categoria').custom(existeCategorias),
    validarCampos
], crearProducto);

// Actualizar - privado - cualquiera con un token válido
router.put('/:id', [
        validarJWT,
        check('id').custom(existeProduto),
        validarCampos
    ],
    actulizarProducto);

// Borrar una categoria - Admin
router.delete('/:id', [
        validarJWT,
        tieneRol('ADMIN_ROLE'),
        check('id').custom(existeProduto),
        check('id', 'No es un id de  Mongo válido').isMongoId(),
        validarCampos
    ],
    borrarProducto);


module.exports = router;