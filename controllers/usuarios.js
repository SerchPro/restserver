const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {

    const { desde = 0, limit = 5 } = req.query;
    const [total, usuarios] = await Promise.all(
        [
            Usuario.countDocuments({ estado: true }),
            Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limit))
        ]);
    res.json({ total, usuarios });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();
    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarios = await Usuario.findByIdAndUpdate(id, resto)
    res.json({
        msg: 'put API - usuariosPut',
        usuarios
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    // eliminar usuario
    // const usuario =  await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json(usuario, usuarioAutenticado);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}