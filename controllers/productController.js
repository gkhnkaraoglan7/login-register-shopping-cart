const Product = require("../models/Product");
const errors=[];



module.exports.getProduct = (req, res, next) => {

  Product.find({}).then(product => {
  
  if (product) {
    res.render("pages/index", {
    product
    });
  } else {
    errors.push({ message: "Products Not Found" });
    res.render("pages/index", {
      errors
    });
    
  }
}).catch(err => console.log(err));
};

module.exports.getProductDetails = (req, res, next) => {
  var _id=req.params._id;
  Product.find({_id}).then(product => {
    
    if (product) {
      res.render("pages/productDetails", {
      product
      });
    } else {
      errors.push({ message: "Products Not Found" });
      res.render("pages/productDetails", {
        errors
      });
    }
  }).catch(err => console.log(err));
};


module.exports.computer = (req, res, next) => {

  Product.find({category:"computer"}).then(product => {
  
  if (product) {
    res.render("pages/index", {
    product
    });
  } else {
    errors.push({ message: "Products Not Found" });
    res.render("pages/index", {
      errors
    });
    
  }
}).catch(err => console.log(err));
};

module.exports.laptop = (req, res, next) => {

  Product.find({category:"laptop"}).then(product => {
  
  if (product) {
    res.render("pages/index", {
    product
    });
  } else {
    errors.push({ message: "Products Not Found" });
    res.render("pages/index", {
      errors
    });
    
  }
}).catch(err => console.log(err));
};

module.exports.mobilPhone = (req, res, next) => {

  Product.find({category:"mobilPhone"}).then(product => {
  
  if (product) {
    res.render("pages/index", {
    product
    });
  } else {
    errors.push({ message: "Products Not Found" });
    res.render("pages/index", {
      errors
    });
    
  }
}).catch(err => console.log(err));
};


module.exports.search = (req, res, next) => {
  const errors = [];
    Product.find({}).then(product => {
    
    if (product) {
      res.render("pages/index", {
      product
      });
    } else {
      errors.push({ message: "Products Not Found get" });
      res.render("pages/index", {
        errors
      });
      
    }
  }).catch(err => console.log(err));
  };
 
module.exports.postsearch = (req, res, next) => {
  const errors = [];
  const search=req.body.search;
  Product.find( { $text: { $search: search } }).then(product => {
  console.log(search);
  if (product) {
    res.render("pages/index", {
    product
    
    });
    console.log(product);
  } else {
    errors.push({ message: "Products Not Found search" });
    res.render("pages/index", {
      errors
    });
    
  }
}).catch(err => console.log(err));
};
