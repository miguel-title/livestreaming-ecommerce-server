const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  avatar: { type: Schema.Types.String },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  surname: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  cpf: {
    type: Schema.Types.String,
    required: true,
  },
  store: {
    type: Schema.Types.String,
    required: true,
  },
  cnpj: {
    type: Schema.Types.String,
  },
  address: {
    type: Schema.Types.String,
    required: true,
  },
  number: {
    type: Schema.Types.Number,
    required: true,
  },
  complement: {
    type: Schema.Types.String,
  },
  neighborhood: {
    type: Schema.Types.String,
    required: true,
  },
  estado: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.Number,
    required: true,
  },
});

module.exports = Vendors = mongoose.model("vendors", VendorSchema);
