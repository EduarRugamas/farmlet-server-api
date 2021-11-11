const httpStatus = require('http-status');

const Error204 = {
    code: httpStatus.NO_CONTENT,
    messages: 'No se encontro contenido'
};

const Error404 = {
    code: httpStatus.NO_CONTENT,
    messages: 'Url no encotrada'
};

const Error_delete = {
    code: httpStatus.NOT_FOUND,
    messages: 'No se pudo eliminar el registro'
};

const OK200Delete = {
    code: httpStatus.OK,
    messages: 'Registro eliminado correctamente'
}
const Error400UserExiste = {
    code: httpStatus.BAD_REQUEST,
    messages: 'El Email o Username ya existe'
}

const Error200Exitoso = {
    code: httpStatus.OK,
    messages: 'Registro actualizado exitosamente'
}

const Error400Token = {
    code: httpStatus.BAD_REQUEST,
    messages: 'Token no encontrado'
}

const Error400TokenEmail = {
    code: httpStatus.BAD_REQUEST,
    messages: 'Usuario no encontrado con este email'
}


module.exports = {
    Error204,
    Error404,
    OK200Delete,
    Error_delete,
    Error400UserExiste,
    Error200Exitoso,
    Error400Token,
    Error400TokenEmail
}
