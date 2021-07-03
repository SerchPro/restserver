const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next) => {
    //console.log(req.headers('token'))
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({
            msg: 'No token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById({ _id: uid });
        //console.log(usuario)
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Invalid token'
        })
    }
    //console.log(token);
}





module.exports = {
    validarJWT
}