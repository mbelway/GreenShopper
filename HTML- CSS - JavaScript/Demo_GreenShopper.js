// Shopping Cart functions *********************

  var shoppingCart = (function() {
    // Private methods and properties
    var cart = [];

    function Item(name, price, count) {
    this.name = name,
    this.price = price,
    this.count = count
    };

    // save cart to local storage
    function saveCart() {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    };

    // load cart from local storage
    function loadCart() {
      cart = JSON.parse(localStorage.getItem("shoppingCart"));
    };

    loadCart();

    // Public methods and properties
    var obj = {};

    // add 1 Item to cart
    obj.addItemToCart = function(name, price, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    };

    // removes 1 Item from Cart
    obj.removeItemFromCart = function(name) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count--;
          if (cart[i].count === 0) {
            cart.splice(i, 1);
          }
          break;
        }
      }
      saveCart();
    };

    // clears entire Cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    };

    // count total of Cart items
    obj.countCart = function() {
      var totalCount = 0;
      for (var i in cart) {
        totalCount += cart[i].count;
      }
      return totalCount;
    };

    // total cost of full Cart
    obj.totalCost = function() {
      var totalCost = 0;
      for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
      }
      return totalCost.toFixed(2); // .toFixed ensures 2 decimals after price
    };


    // list full Cart array - all items
    obj.listCart = function() {
      var cartCopy = [];
      for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2); // ensures 2 decimals in prices
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    };


    return obj;
})();
