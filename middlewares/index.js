const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/valida-roles');




module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}