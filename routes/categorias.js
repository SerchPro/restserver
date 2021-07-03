const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    borrarCategorias,
    actulizarCategorias
} = require('../controllers/categorias');
const { existeCategorias } = require('../helpers/existe-categorias');
const { validarJWT, validarCampos, tieneRol } = require('../middlewares');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por un id -publico
router.get('/:id', [
    check('id', 'No es un id de  Mongo válido').isMongoId(),
    check('id').custom(existeCategorias),
    validarCampos
], obtenerCategoria);

// Crear categoria - privada - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con un token válido
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id').custom(existeCategorias),
        validarCampos
    ],
    actulizarCategorias);

// Borrar una categoria - Admin
router.delete('/:id', [
        validarJWT,
        tieneRol('ADMIN_ROLE'),
        check('id').custom(existeCategorias),
        check('id', 'No es un id de  Mongo válido').isMongoId(),
        validarCampos
    ],
    borrarCategorias);


module.exports = router;