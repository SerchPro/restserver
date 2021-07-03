const { response } = require('express');
const { body } = require('express-validator');
const { Producto } = require('../models');


// obtenerCategorias - paginado - total -populate
const obtenerProductos = async(req, res = response) => {
    const { desde = 0, limit = 5 } = req.query;
    const [total, Productos] = await Promise.all(
        [
            Producto.countDocuments({ estado: true }),
            Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
        ]);

    res.json({ total, Productos });

}

// obtenerCategoria - populate {}
const obtenerProducto = async(req, res = response) => {
    const { id } = req.params;
    const cat = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json(cat);

}


const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body

    const nombre = body.nombre.toUpperCase()
    const producto = await Producto.findOne({ nombre });

    if (producto) {
        res.status(400).json({
            msg: ` El producto  ${producto.nombre} ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre: nombre,
        usuario: req.usuario._id,
        ...body
    }
    const productoDb = new Producto(data);

    //Guardar DB
    await productoDb.save();
    res.status(201).json({
        productoDb
    })
}

// actulizarCategorias
const actulizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    if (body.nombre) {
        const nombre = body.nombre.toUpperCase();
    }

    body.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, body, { new: true });

    res.json({
        producto
    });

}

// borrarCategorias - estado:false
const borrarProducto = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;
    //console.log(usuarioAutenticado);
    //console.log(categoria);
    res.status(200).json({ producto, usuarioAutenticado });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actulizarProducto,
    borrarProducto
}