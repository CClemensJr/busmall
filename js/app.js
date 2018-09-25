'use strict';

// DONE - Store the clicks in a global variable 
var totalClicks = 0;
var images = [['/img/bag.jpg', '/img/banana.jpg', '/img/bathroom.jpg', '/img/boots.jpg', '/img/breakfast.jpg',      'img/bubblegum.jpg', '/img/chair.jpg', '/img/cthulhu.jpg', '/img/dog-duck.jpg', '/img/dragon.jpg', '/img/pen.jpg','/img/pet-sweep.jpg', '/img/scissors.jpg','/img/shark.jpg','/img/sweep.png','/img/tauntaun.jpg','/img/unicorn.jpg','/img/usb.gif','/img/water-can.jpg','/img/wine-glass.jpg'], ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']];

var productOnLeft = document.getElementById('product1');
var productInMiddle = document.getElementById('product2');
var productOnRight = document.getElementById('product3');


// Display potential products in a row of 3;
  //DONE - Create an Item object constructor that takes a source and a name as parameters and stores the number of times a Product is shown and selected in instance properties
function Product(filepath, filename) {
    this.productImgSrc = filepath;
    this.productName = filename;
    this.productShown = 0;
    this.productSelected = 0;

    Product.allProducts.push(this);
}
//DONE - Push each instance into an object array
Product.allProducts = [];

Product.prototype.countClicked = function()
{
    this.productSelected += 1;
};

Product.prototype.countShown = function()
{
    this.productShown += 1;
}; 


//DONE - Use a function to put 3 random images onto the page
//DONE - Make sure that each item is different.
//DONE - Add 1 to the item shown counter for each item object shown
function showProducts(event)
{
    var leftNum = rando(0, Product.allProducts.length);
    var midNum = rando(0, Product.allProducts.length);
    var rightNum = rando(0, Product.allProducts.length);

    if (event)
    {
        totalClicks += 1;

        for (var i = 0; i < Product.allProducts.length; i++)
        {
             if (event.target.alt === Product.allProducts[i].productName)
             {
                 Product.allProducts[i].countClicked();
                 break;
             }
        }

    }
    
    if (totalClicks === 25)
    {
        console.log('25 CLICKS!');
    }

    if (leftNum !== midNum && leftNum !== rightNum && midNum !== rightNum )
    {
        productOnLeft.src = Product.allProducts[leftNum].productImgSrc;
        productOnLeft.alt = Product.allProducts[leftNum].productName;

        productInMiddle.src = Product.allProducts[midNum].productImgSrc;
        productInMiddle.alt = Product.allProducts[midNum].productName;

        productOnRight.src = Product.allProducts[rightNum].productImgSrc;
        productOnRight.alt = Product.allProducts[rightNum].productName;
        
        Product.allProducts[leftNum].countShown();
        Product.allProducts[midNum].countShown();
        Product.allProducts[rightNum].countShown();
    }
    else
    {
        showProducts();
    }

    console.log(Product.allProducts);
}


function rando(min, max)
{
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return randomNumber;
}
  // Clear the images then show 3 new items


// The user needs to click on 1 of the three images
  // DONE - Create an event listener for each img tag
  productOnLeft.addEventListener('click', showProducts);
  productInMiddle.addEventListener('click', showProducts);
  productOnRight.addEventListener('click', showProducts);

  // Call a function that collects the click and the image selected
  // Store the clicks in a global variable and image selected in an instance property.

  //DONE - Create instances of the Product object
for (var i = 0; i < images[0].length; i++)
{
  new Product(images[0][i], images[1][i]);
}

showProducts();
//Show the user has selected 25 images (clicked 25 times) they are shown a graph with the images and the number of clicks per image
  // Turn off the event listeners
  // Display a list of items with the number of votes received ie "3 votes for Banana Slicer"
  // After the global click variable hits 25, call a function that shows a graph

//The percentage of times an image has been shown needs to be stored
  //Store times item object is shown in an instance property 
  //Use a prototype to calculate the percentage of time an item is clicked when shown then assign value to instance property.
  //Re Calculate the percentage each time an item is shown
