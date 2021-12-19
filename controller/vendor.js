const Vendor = require("../models/venor");
const bcrypt = require("bcryptjs");

//Load validation
const validateLoginInput = require("../validation/vendor/login");
const validateRegisterInput = require("../validation/vendor/register");
const HttpException = require("../utils/HttpException.utils");

//register
const register = async (req, res) => {
  const { errors, errorMsg, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    throw new HttpException(400, errorMsg);
  }
  await Vendor.findOne({ email: req.body.email }).then((vendor) => {
    if (vendor) {
      errors.email = "Email already exists";
      throw new HttpException(400, "Email already exists");
    }

    const newVendor = new Vendor({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      cpf: req.body.cpf,
      store: req.body.store,
      cnpj: req.body.cnpf,
      address: req.body.address,
      number: req.body.number,
      neighborhood: req.body.neighborhood,
      complement: req.body.complement,
      estado: req.body.estado,
      city: req.body.city,
      password: req.body.password,
      role: req.body.role,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newVendor.password, salt, (err, hash) => {
        // if (err) throw err;
        newVendor.password = hash;
        newVendor
          .save()
          .then((vendor) => res.send({ status: 200, message: "success" }))
          .catch((err) => console.log(err));
      });
    });
  });
};

//login
const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  Vendor.findOne({ email }).then((vendor) => {
    if (!vendor) {
      errors.email = "Vendor not found";
      return res.status(400).json(errors);
    }

    // Check Password
    bcrypt.compare(password, vendor.password).then((isMatch) => {
      if (isMatch) {
        // Vendor Matched
        const payload = { id: vendor.id, name: vendor.name, role: vendor.role }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              vendor: vendor,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

module.exports = {
  login,
  register,
};
