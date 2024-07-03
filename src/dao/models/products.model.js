import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "products";

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnails: {
      type: Array,
      required: false,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
    owner: {
      type: String,
      required: true,
  },
});


productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, productSchema);
export default productsModel;