const Validator = require("validator");
const isEmpty = require("../../utils/is-empty.utils");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.cpf = !isEmpty(data.cpf) ? data.cpf : "";
  data.store = !isEmpty(data.store) ? data.store : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.number = !isEmpty(data.number) ? data.number : "";
  data.complement = !isEmpty(data.complement) ? data.complement : "";
  data.neighborhood = !isEmpty(data.neighborhood) ? data.neighborhood : "";
  data.estado = !isEmpty(data.estado) ? data.estado : "";
  data.city = !isEmpty(data.city) ? data.city : "";

  var errorMsg = "";

  if (data.role == 1) {
    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
      if (isEmpty(errorMsg)) {
        errorMsg = errors.name;
      }
    }
    if (Validator.isEmpty(data.surname)) {
      errors.surname = "Surname field is required";
      if (isEmpty(errorMsg)) {
        errorMsg = errors.surname;
      }
    }
    if (Validator.isEmpty(data.cpf)) {
      errors.cpf = "Cpf field is required";
      if (isEmpty(errorMsg)) {
        errorMsg = errors.cpf;
      }
    }
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.email;
    }
  }

  if (data.role == 0) {
    if (Validator.isEmpty(data.store)) {
      errors.store = "Store field is required";
      if (isEmpty(errorMsg)) {
        errorMsg = errors.store;
      }
    }
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.address;
    }
  }
  if (Validator.isEmpty(data.number)) {
    errors.number = "Number field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.number;
    }
  }
  if (Validator.isEmpty(data.neighborhood)) {
    errors.neighborhood = "Neighborhood field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.neighborhood;
    }
  }
  if (Validator.isEmpty(data.estado)) {
    errors.estado = "Estado field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.estado;
    }
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.city;
    }
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A senha deve ter mais de 6 caracteres.";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.password;
    }
  }

  if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword = "Confirm Password field is required";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.confirmpassword;
    }
  }

  if (!Validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = "Passwords must match";
    if (isEmpty(errorMsg)) {
      errorMsg = errors.confirmpassword;
    }
  }

  return {
    errors,
    errorMsg,
    isValid: isEmpty(errors),
  };
};
