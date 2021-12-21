const Validator = require("validator");
const isEmpty = require("../../utils/is-empty.utils");

module.exports = function validateLoginInput(data) {
  let errors = {};

  var errorMsg = "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email inválido";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.email;
    }
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "E-mail é obrigatório";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.email;
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Senha requerida";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.password;
    }
  }

  return {
    errors,
    errorMsg,
    isValid: isEmpty(errors),
  };
};
