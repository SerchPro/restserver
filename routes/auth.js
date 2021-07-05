const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
        //check('nombre', 'El nombre no es válido').not().isEmpty(),
        check('password', 'El password no es válido').not().isEmpty(),
        check('correo', 'El correo no es válido').isEmail(),
        //check('correo').custom(emailExiste),
        //check('rol').custom(esRolValido),
        validarCampos
    ],
    login);

router.post('/google', [
        check('id_token', 'El id_token es necesario').not().isEmpty(),
        validarCampos
    ],
    googleSignin);

module.exports = router;