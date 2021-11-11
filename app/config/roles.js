const roles = ['admin'];

const roleRights =  new Map();
roleRights.set(roles[0], [
    'manageOwnData',
    'getMedicamentos',
    'manageMedicamentos',
    'getPromociones',
    'managePromociones',
    'getCarrito',
    'manageCarrito',
    'getUsers',
    'manageUsers'
]);

module.exports = {
    roles,
    roleRights
}
