const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
  createdDate: {
    type: Schema.Types.Date,
  },
  updateDate: {
    type: Schema.Types.Date,
  },
  content: {
    type: Schema.Types.String,
  },
});

module.exports = Blogs = mongoose.model("blogs", BlogSchema);
