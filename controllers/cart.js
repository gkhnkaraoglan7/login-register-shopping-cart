module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQuantity = oldCart.totalQuantity || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, _id) {
    var storedItem = this.items[_id];
    if (!storedItem) {
      storedItem = this.items[_id] = { item: item, quantity: 0, unitPrice: 0 };
    }
    storedItem.quantity++;
    storedItem.unitPrice = storedItem.item.unitPrice * storedItem.quantity;
    this.totalQuantity++;
    this.totalPrice += storedItem.item.unitPrice;
  };
  this.generalArray = function() {
    var arr = [];
    for (var _id in this.items) {
      arr.push(this.items[_id]);
    }
    return arr;
  };
  this.reduceByOne = function(_id) {
      
    this.items[_id].quantity--;
    this.items[_id].unitPrice -= this.items[_id].item.unitPrice;
    this.totalQuantity--;
    this.totalPrice -= this.items[_id].item.unitPrice;
    if (this.items[_id].quantity <= 0) {
      delete this.items[_id];
    }
  };
  this.removeAll=function(_id){
    this.totalQuantity-=this.items[_id].item.quantity;
    this.totalPrice -= this.items[_id].item.unitPrice;
    delete this.items[_id];
  }
};
