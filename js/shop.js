// products is an array containing JSON objects
var products = [{
  "Name": "Happy Birthday",
  "Description": "Birthday greeting",
  "Price": 2.99,
  "Image": "images/happybirthday.jpg",
  "Category": "Greetings"
}, {
  "Name": "Design Things",
  "Description": "Design card",
  "Price": 3.99,
  "Image": "images/designthings.jpg",
  "Category": "Design"

}, {
  "Name": "Brain Acrobat",
  "Description": "Synaptic specialists",
  "Price": 4.99,
  "Image": "images/brainacrobat.jpg",
  "Category": "Speciality"
}, {
  "Name": "Design Experts",
  "Description": "Unicorn design experts",
  "Price": 3.99,
  "Image": "images/unicorndesign.jpg",
  "Category": "Design"
}, {
  "Name": "Sun Tzu",
  "Description": "The art of the DOM",
  "Price": 6.99,
  "Image": "images/suntzu.jpg",
  "Category": "Speciality"
}, {
  "Name": "Dogs",
  "Description": "Dogs of the world unite",
  "Price": 4.99,
  "Image": "images/dogsoftheworld.jpg",
  "Category": "Greetings"
}, {
  "Name": "Code",
  "Description": "Code this",
  "Price": 5.99,
  "Image": "images/code.jpg",
  "Category": "Code"
}, {
  "Name": "Fi Dren",
  "Description": "The wifi guy",
  "Price": 8.99,
  "Image": "images/fidren.jpg",
  "Category": "Speciality"
}, {
  "Name": "Bugs Studio",
  "Description": "Fixing developers",
  "Price": 9.99,
  "Image": "images/bugstudio.jpg",
  "Category": "Code"
}
]; // end of products array

//Build the DOM
//for i is less than the number of array items in var prodcucts do the following
function buildDOM() {
    document.getElementById("product-container").innerHTML = "";
    for(var i = 0; i < products.length; i++) {
      var productDiv = document.createElement("div");
      productDiv.setAttribute("class", "col-md-4 product-div");
      productDiv.setAttribute("category", products[i].Category);
      var name = document.createTextNode(products[i].Name);
      var description = document.createTextNode(products[i].Description);
      var price = document.createTextNode(products[i].Price);
      var heading = document.createElement("h3");
      var paragraph = document.createElement("p");
      var paragraph2 = document.createElement("p");
      var dollarsign = document.createTextNode("$");
      var image = document.createElement("img");
      image.setAttribute("src", products[i].Image);
      image.setAttribute("class", "img-responsive");
      var button = document.createElement("button");
      button.setAttribute("class", "btn btn-success");
      button.setAttribute("index", i);
      button.setAttribute("onclick", "getProductInfo(getAttribute('index'))");
      var icon = document.createElement("span");
      icon.setAttribute("class", "glyphicon glyphicon-shopping-cart");
      button.appendChild(icon);
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("value", "1");
      input.setAttribute("min", "0");
      input.setAttribute("max", "100");
      input.setAttribute("class", "product-input");
      input.setAttribute("id", "product-qty" + i);
      var button2 = document.createElement("button");
      button2.setAttribute("class", "btn btn-default heart");
      button2.setAttribute("index", i);
      button2.setAttribute("onclick", "addToWishList(getAttribute('index'))");
      var icon2 = document.createElement("span");
      icon2.setAttribute("class", "fa fa-heart-o");
      button2.appendChild(icon2);
      heading.appendChild(name);
      paragraph.appendChild(description);
      productDiv.appendChild(heading);
      productDiv.appendChild(image);
      productDiv.appendChild(paragraph);
      paragraph2.appendChild(dollarsign);
      paragraph2.appendChild(price);
      productDiv.appendChild(paragraph2);
      productDiv.appendChild(button);
      productDiv.appendChild(input);
      productDiv.appendChild(button2);
      document.getElementById("product-container").appendChild(productDiv);
    } // end of for
} // end of function

// window onload function to build the DOM
window.onload = buildDOM();

// function list
function list() {
    var displayItems = document.getElementsByClassName("product-div");
    for(var i = 0; i < displayItems.length; i++) {
      displayItems[i].style.width = "100%";
    }// end of for
}// end of function

// function grid
function grid() {
    var displayItems = document.getElementsByClassName("product-div");
    for(var i = 0; i < displayItems.length; i++) {
      displayItems[i].style.width = "";
    }// end of for
}// end of function

// onchange function sortByChoice
document.getElementById("sortByChoice").onchange = function() {
    var selectElement = document.getElementById("sortByChoice");
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;
    if(selectedOption === "LowToHigh") {
      products.sort(ascendingOrder);
    } else if(selectedOption === "HighToLow") {
      products.sort(descendingOrder);
    } else {
      products.sort(alphabeticalOrder);
    }
    buildDOM();
}; // end of onchange function

// function ascendingOrder
function ascendingOrder(a,b) {
    for(var i = 0; i < products.length; i++) {
       return (a.Price) - (b.Price);
    }// end of for
}// end of function

// function descendingOrder
function descendingOrder(a,b) {
    for(var i = 0; i < products.length; i++) {
        return (b.Price) - (a.Price);
    }// end of for
}// end of function

// function alphabeticalOrder
function alphabeticalOrder(a,b) {
    for(var i = 0; i < products.length; i++) {
        return (a.Name) > (b.Name);
    }// end of for
}// end of function


// function updateFilter
function updateFilter() {
    var category = [];
    var inputCheckboxes = document.getElementsByClassName("filterCategory");
    var products = document.getElementsByClassName("product-div");
    for(var i = 0; i < inputCheckboxes.length; i++) {
      if(inputCheckboxes[i].checked) {
        var inputCheckboxValue = inputCheckboxes[i].getAttribute("value");
        category.push(inputCheckboxValue);
        //alert(category);
      }// end of if
    }// end of for
    for(var j = 0; j < products.length; j++) {
      var productCategory = products[j].getAttribute("category");
      products[j].style.display = "none";
      for(var k = 0; k < category.length; k++) {
        if(category[k] === productCategory) {
          products[j].style.display = "block";
          break;
        }// end of if
      }// end of for
    }// end of for
    for(var l = 0; l < products.length; l++) {
      if(category.length === 0) {
          products[l].style.display = "block";
      }// end of if
    }// end of for
}//end of function

// Cart object
var cart = {
items: [],
numberItems: 0,
total: 0,
coupon: ["50%Off", "30%Off"],
wishlist: [],
couponValue: 1,
shipping: 0,
shippingLocation: ""
};


// function getProductInfo
function getProductInfo(index) {
  var quantity = parseInt(document.getElementById("product-qty" + index).value);
  //alert(quantity);
  var product = {
    Id: index,
    Name: products[index].Name,
    Description: products[index].Description,
    Price: products[index].Price,
    Amount: products[index].Price * quantity,
    Quantity: quantity
  }; // end of object
  //alert(product.Id);
  var productAlreadyInCart = false;
  for(var i = 0; i < cart.items.length; i++) {
    if(cart.items[i].Id === index) {
      productAlreadyInCart = true;
      cart.items[i].Amount = (product.Amount + cart.items[i].Amount);
      cart.items[i].Quantity = product.Quantity + cart.items[i].Quantity;
      break;
    }// end of if
  }// end of for
  if(!productAlreadyInCart) {
    cart.items.push(product);
  }// end of if
  buildCart();
}// end of function
