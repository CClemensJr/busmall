'use strict';

// DONE - Store the clicks in a global variable
var totalClicks = 0;
var images = [['/img/bag.jpg', '/img/banana.jpg', '/img/bathroom.jpg', '/img/boots.jpg', '/img/breakfast.jpg', 'img/bubblegum.jpg', '/img/chair.jpg', '/img/cthulhu.jpg', '/img/dog-duck.jpg', '/img/dragon.jpg', '/img/pen.jpg','/img/pet-sweep.jpg', '/img/scissors.jpg','/img/shark.jpg','/img/sweep.png','/img/tauntaun.jpg','/img/unicorn.jpg','/img/usb.gif','/img/water-can.jpg','/img/wine-glass.jpg'], ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']];

var productOnLeft = document.getElementById('product1');
var productInMiddle = document.getElementById('product2');
var productOnRight = document.getElementById('product3');
var productElements = [productOnLeft, productInMiddle, productOnRight];


// Display potential products in a row of 3;
//DONE - Create an Item object constructor that takes a source and a name as parameters and stores the number of times a Product is shown and selected in instance properties
function Product(filepath, filename) {
  this.productImgSrc = filepath;
  this.productName = filename;
  this.productShown = 0;
  this.productSelected = 0;
  this.previouslyShown = false;

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


function eventHandler(event){
  totalClicks += 1;

  for (var i = 0; i < Product.allProducts.length; i++)
  {
    if (event.target.alt === Product.allProducts[i].productName)
    {
      Product.allProducts[i].countClicked();

      break;
    }
  }

  checkTotalClicks();
}
//DONE - Use a function to put 3 random images onto the page
//DONE - Make sure that each item is different.
//DONE - Add 1 to the item shown counter for each item object shown
function showProducts()
{
  var randomProducts = [rando(0, Product.allProducts.length), rando(0, Product.allProducts.length), rando(0, Product.allProducts.length)];

  if (checkUniqueness(randomProducts))
  {

    // if (checkPreviouslyShownStatus(randomProducts))
    // {
    //     console.log(checkUniqueness(randomProducts));
    //     showProducts();
    // }
    console.log('Previously Shown Status: ', Product.allProducts[randomProducts[0]].previouslyShown, Product.allProducts[randomProducts[1]].previouslyShown, Product.allProducts[randomProducts[2]].previouslyShown);
    if (Product.allProducts[randomProducts[0]].previouslyShown === false &&
            Product.allProducts[randomProducts[1]].previouslyShown === false &&
            Product.allProducts[randomProducts[2]].previouslyShown === false)
    {
      for (var j = 0; j < randomProducts.length; j++)
      {
        productElements[j].src = Product.allProducts[randomProducts[j]].productImgSrc;
        productElements[j].alt = Product.allProducts[randomProducts[j]].productName;
        Product.allProducts[randomProducts[j]].countShown();
        Product.allProducts[randomProducts[j]].previouslyShown = true;
      }
    }
    else
    {
      for (var k = 0; k < randomProducts.length; k++)
      {
        Product.allProducts[k].previouslyShown = false;
      }
      showProducts();
    }
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

//Show the user has selected 25 images (clicked 25 times) they are shown a graph with the images and the number of clicks per image
// Turn off the event listeners
// Display a list of items with the number of votes received ie "3 votes for Banana Slicer"
// After the global click variable hits 25, call a function that shows a graph

//The percentage of times an image has been shown needs to be stored
//Use a prototype to calculate the percentage of time an item is clicked when shown then assign value to instance property.
//Re Calculate the percentage each time an item is shown

function checkTotalClicks()
{
  if (totalClicks === 25)
  {
    productOnLeft.removeEventListener('click', showProducts);
    productInMiddle.removeEventListener('click', showProducts);
    productOnRight.removeEventListener('click', showProducts);
  }
}

function checkUniqueness(array)
{
  console.log('In checkUniqueness');
  var counts = [];

  for (var i = 0; i < array.length; i++)
  {
    if (counts[array[i]] === undefined)
    {
      counts[array[i]] = 1;
    }
    else
    {
      return false;
    }
  }

  return true;
}

function checkPreviouslyShownStatus(array)
{

  for (var i = 0; i < array.length; i++)
  {
    if (Product.allProducts[array[i]].previouslyShown)
    {
      this.previouslyShown = false;
      return true;
    }
    else
    {
      this.previouslyShown = true;
      return false;
    }
  }
}
// Clear the images then show 3 new items


// The user needs to click on 1 of the three images
// DONE - Create an event listener for each img tag
// DONE - Call a function that collects the click and the image selected
// DONE - Store the clicks in a global variable and image selected in an instance property.
productOnLeft.addEventListener('click', eventHandler);
productInMiddle.addEventListener('click', eventHandler);
productOnRight.addEventListener('click', eventHandler);


//DONE - Create instances of the Product object
for (var i = 0; i < images[0].length; i++)
{
  new Product(images[0][i], images[1][i]);
}

showProducts();
