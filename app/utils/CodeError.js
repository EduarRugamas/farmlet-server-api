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

module.exports = {
    Error204,
    Error404,
    OK200Delete,
    Error_delete
}
