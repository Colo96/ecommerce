const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "businesses";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    default: [],
  },
});

schema.plugin(mongoosePaginate);
const BusinessesModel = model(collection, schema);
module.exports = BusinessesModel;
