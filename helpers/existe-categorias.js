const categoria = require("../models/categoria")


const existeCategorias = async(_id) => {
    const categoriaExiste = await categoria.findById({ _id });
    if (!categoriaExiste) {
        throw new Error(`El id: ${ id}, no existe`)
    }
    //console.log(categoriaExiste)
}


module.exports = {
    existeCategorias
}