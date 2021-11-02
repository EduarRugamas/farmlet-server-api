const httpStatus = require('http-status');

const Error204 = {
    code: httpStatus.NO_CONTENT,
    messages: 'No se encontro contenido'
};

const Error404 = {
    code: httpStatus.NO_CONTENT,
    messages: 'Url no encotrada'
};

module.exports = {
    Error204,
    Error404
}
