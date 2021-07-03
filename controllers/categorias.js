const { response } = require('express');
const { Categoria } = require('../models');


// obtenerCategorias - paginado - total -populate
const obtenerCategorias = async(req, res = response) => {
    const { desde = 0, limit = 5 } = req.query;
    const [total, categorias] = await Promise.all(
        [
            Categoria.countDocuments({ estado: true }),
            Categoria.find({ estado: true })
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
        ]);

    res.json({ total, categorias });

}

// obtenerCategoria - populate {}
const obtenerCategoria = async(req, res = response) => {
    const { id } = req.params;
    const cat = await Categoria.findById(id)
        .populate('usuario', 'nombre');
    res.json(cat);

}


const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        res.status(400).json({
            msg: ` La categoria ${categoriaDB.nombre} ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();
    res.status(201).json({
        categoria
    })
}

// actulizarCategorias
const actulizarCategorias = async(req, res = response) => {

    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate(id, { "nombre": nombre }, { new: true })
    res.json({
        categoria
    });

}

// borrarCategorias - estado:false
const borrarCategorias = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;
    //console.log(usuarioAutenticado);
    //console.log(categoria);

    res.status(200).json({ categoria, usuarioAutenticado });
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actulizarCategorias,
    borrarCategorias
}