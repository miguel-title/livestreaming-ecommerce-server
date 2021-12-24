const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Vendor = require("../models/venor");
const Blog = require("../models/blog");

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
      errors.email = "e-mail já existe";
      throw new HttpException(400, "e-mail já existe");
    }

    const newVendor = new Vendor({
      avata: req.body.avata,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      cpf: req.body.cpf,
      store: req.body.store,
      cnpj: req.body.cnpj,
      address: req.body.address,
      number: req.body.number,
      neighborhood: req.body.neighborhood,
      complement: req.body.complement,
      estado: req.body.estado,
      city: req.body.city,
      password: req.body.password,
      role: req.body.role,
      isCpf: req.body.isCpf,
      resteredDate: new Date(),
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newVendor.password, salt, (err, hash) => {
        // if (err) throw err;
        newVendor.password = hash;
        newVendor
          .save()
          .then((vendor) =>
            res.send({
              status: 200,
              message: "Usuário Registrado!",
              email: newVendor.email,
              userName: newVendor.name,
              role: newVendor.role,
            })
          )
          .catch((err) => console.log(err));
      });
    });
  });
};

const adminregister = async (req, res) => {
  await Vendor.findOne({ email: "admin@treebee.com", role: 2 }).then(
    (vendor) => {
      if (vendor) {
        throw new HttpException(200, "e-mail já existe");
      }

      const newAdmin = new Vendor({
        email: "admin@treebee.com",
        password: "admin_treebee",
        role: 2,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          // if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then((admin) =>
              res.send({
                status: 200,
                message: "Usuário Registrado!",
                email: newAdmin.email,
                role: newAdmin.role,
              })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  );
};

//updateAccount
const updateAccount = async (req, res) => {
  await Vendor.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then(async (item) => {
      res.send({ status: 200, message: "Usuário atualizado!" });
    })
    .catch((err) => {
      res.send({ status: 400, message: err });
    });
};

//login
const login = async (req, res) => {
  const { errors, errorMsg, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    throw new HttpException(400, errorMsg);
  }
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  await Vendor.findOne({ email, role }).then((vendor) => {
    if (!vendor) {
      if (role === 0) {
        errors.email = "Vendedor não encontrado";
      } else if (role === 1) {
        errors.email = "Usuário não encontrado";
      } else if (role === 2) {
        errors.email = "Admin não encontrado";
      }
      throw new HttpException(400, errors.email);
    }

    // Check Password
    bcrypt.compare(password, vendor.password).then((isMatch) => {
      if (isMatch) {
        // Vendor Matched
        const payload = {
          id: vendor.id,
          name: vendor.name,
          role: vendor.role,
          email: vendor.email,
          avataUrl: vendor.avata,
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              status: 200,
              success: true,
              email: vendor.email,
              userName: vendor.name,
              role: vendor.role,
              avataUrl: vendor.avata,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.json({ status: 400, message: "Senha é incorreta" });
      }
    });
  });
};

const getAccountInfo = async (req, res) => {
  const nID = req.body.id;
  await Vendor.findById(nID).then((accountInfo) => {
    if (!accountInfo) {
      errors.msg = "O servidor está com problemas.";
      throw new HttpException(400, errors.msg);
    }

    res.send(accountInfo);
  });
};

const uploadFile = async (req, res) => {
  const url = req.protocol + "://api.treebee.com.br"; // + req.get("host");
  const fileUrl = url + "/" + req.file.path;

  return res.json({ url: fileUrl });
};

//About Blogs
const getBlogs = async (req, res) => {
  const nCount = req.body.count;
  if (nCount != -1) {
    await Blog.find()
      .limit(nCount)
      .then((blogdata) => {
        res.send(blogdata);
      })
      .catch((err) => {
        res.send({
          status: 500,
          msg: err,
        });
      });
  } else {
    await Blog.find()
      .then((blogdata) => {
        res.send(blogdata);
      })
      .catch((err) => {
        res.send({
          status: 500,
          msg: err,
        });
      });
  }
};

const getBlog = async (req, res) => {
  const nID = req.body.id;
  await Blog.findById(nID).then((BlogData) => {
    if (!BlogData) {
      throw new HttpException(400, "O servidor está com problemas.");
    }

    res.send(BlogData);
  });
};

const insertBlog = async (req, res) => {
  console.log(req.body, "aaaaaa");
  const newBlog = new Blog({
    name: req.body.name,
    image: req.body.image,
    createdDate: new Date(),
    updateDate: new Date(),
    content: req.body.content,
  });

  newBlog
    .save()
    .then((blog) => {
      res.send({ status: 200, message: "Blog Inserido." });
    })
    .catch((err) => {
      res.send({ status: 500 });
    });
};

const updateBlog = async (req, res) => {
  const nID = req.body.id;

  req.body.updateDate = new Date();

  console.log(req.body);

  await Blog.findByIdAndUpdate(nID, req.body, { new: true })
    .then(async (item) => {
      res.send({ status: 200, message: "Blog atualizado!" });
    })
    .catch((err) => {
      res.send({ status: 500, message: err });
    });
};

const deleteBlog = async (req, res) => {
  const nID = req.body.id;
  await Blog.deleteOne({ _id: nID })
    .then(async (item) => {
      res.send({ status: 200, message: "Blog Excluído!" });
    })
    .catch((err) => {
      res.send({ status: 500, message: err });
    });
};

//About User
const getSellers = async (req, res) => {
  const nCount = req.body.count;
  if (nCount != -1) {
    await Vendor.find({ role: 0 })
      .limit(nCount)
      .then((vendordata) => {
        res.send(vendordata);
      })
      .catch((err) => {
        res.send({
          status: 500,
          msg: err,
        });
      });
  } else {
    await Vendor.find({ role: 0 })
      .then((vendordata) => {
        res.send(vendordata);
      })
      .catch((err) => {
        res.send({
          status: 500,
          msg: err,
        });
      });
  }
};

//About Blogs
const getBuyers = async (req, res) => {
  const nCount = req.body.count;
  if (nCount != -1) {
    await Vendor.find({ role: 1 })
      .limit(nCount)
      .then((vendordata) => {
        res.send(vendordata);
      })
      .catch((err) => {
        res.send({
          status: 500,
          msg: err,
        });
      });
  } else {
    await Vendor.find({ role: 1 })
      .then((vendordata) => {
        res.send(vendordata);
      })
      .catch((err) => {
        res.send({
          status: 500,
          msg: err,
        });
      });
  }
};

const deleteUser = async (req, res) => {
  const nID = req.body.id;
  await Vendor.deleteOne({ _id: nID })
    .then(async (item) => {
      res.send({ status: 200, message: "Vendedor Excluído!" });
    })
    .catch((err) => {
      res.send({ status: 500, message: err });
    });
};

module.exports = {
  login,
  register,
  adminregister,
  getAccountInfo,
  updateAccount,
  uploadFile,
  getBlogs,
  getBlog,
  insertBlog,
  updateBlog,
  deleteBlog,
  getSellers,
  deleteUser,
  getBuyers,
};
