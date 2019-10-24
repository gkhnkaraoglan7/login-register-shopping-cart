const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductShema = new Schema({
  productName : {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  category: {
    type:String ,
    required: true
  },
  quantityPerUnit: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  smallpicture: {
    type: String,
    required: true
  },
  ranking: {
    type: Number,
    required: true
  }
});
ProductShema.index({ category: 'text',productName: 'text',productDescription: 'text' ,color:'text'});

///////////////////////////Tablo Adı "Product" olan
                        //    |     ///
const Product = mongoose.model("Product", ProductShema);

module.exports = Product;