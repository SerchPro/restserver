const { Producto } = require('../models');
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo}, ya está registrado`)
    }
}

const existeUsuarioPorid = async(id) => {
    const existeUser = await Usuario.findById(id);
    if (!existeUser) {
        throw new Error(`El id: ${ id}, no existe`)
    }

}

const existeProduto = async(id) => {
    const existe = await Producto.findById(id);
    if (!existe) {
        throw new Error(`El id: ${ id}, no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`El coleccion: ${ incluida} no es permitida`)
    }

    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorid,
    existeProduto,
    coleccionesPermitidas
}