const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid id');
  }
  return value;
};

const password = (value, helpers) => {
  if (!value.match(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)) {
    return helpers.message('Password must contain at least one letter and one number and at least 8 chars length');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
