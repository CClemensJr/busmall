'use strict';

// DONE - Store the clicks in a global variable
var totalClicks = 0;
var images = [['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg','./img/pet-sweep.jpg', './img/scissors.jpg','./img/shark.jpg','./img/sweep.png','./img/tauntaun.jpg','./img/unicorn.jpg','./img/usb.gif','./img/water-can.jpg','./img/wine-glass.jpg'], ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']];

var productImages = document.getElementById('product-images');
var productOnLeft = document.getElementById('product1');
var productInMiddle = document.getElementById('product2');
var productOnRight = document.getElementById('product3');
var productElements = [productOnLeft, productInMiddle, productOnRight];

var randoArray = [];


function Product(filepath, filename) {
  this.productImgSrc = filepath;
  this.productName = filename;
  this.productShown = 0;
  this.productSelected = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];

Product.prototype.countClicked = function()
{
  this.productSelected += 1;
};

Product.prototype.countShown = function()
{
  this.productShown += 1;
};


function showProducts()
{ 
  var randomProducts = [rando(0, Product.allProducts.length), rando(0, Product.allProducts.length), rando(0, Product.allProducts.length)];

  if (checkUniqueness(randomProducts) === true && checkLastShown(randomProducts) === false)
  {
    for (var j = 0; j < randomProducts.length; j++)
    {
      productElements[j].src = Product.allProducts[randomProducts[j]].productImgSrc;
      productElements[j].alt = Product.allProducts[randomProducts[j]].productName;
      
      Product.allProducts[randomProducts[j]].countShown();
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
  totalClicks += 1;
  console.log('Total Clicks = ', totalClicks);
  if (totalClicks === 25)
  {
    productImages.removeEventListener('click', eventHandler);
  }
}

function checkUniqueness(array)
{
  console.log('In checkUniqueness');
  //console.log('Left', array[0]);
  //console.log('Mid', array[1]);
  //console.log('Right', array[2]);

  var counts = [];

  for (var i = 0; i < array.length; i++)
  {
    if (counts[array[i]] === undefined)
    {
      counts[array[i]] = 1;
    }
    else
    {
      //console.log('Unique = ', false);
      return false;
    }
  }

  //console.log('Unique = ', true);
  return true;
}

function checkLastShown(array)
{
  console.log('In checkLastShown');
  //console.log(`In checkLastShown: RandoArray= ${randoArray[0]}, ${randoArray[1]}, ${randoArray[2]} `);
  var notSame = true;

  if (randoArray[0] === undefined)
  {
    randoArray = array;
  }
  else
  {
    for (var i = 0; i < array.length; i++)
    {
      if (randoArray.includes(array[i]))
      {
        console.log(`The array value ${array[i]} was seen on the last page`);
        notSame = false;

        return true;
      }
      else
      {
        //console.log(`The array ${array[i]} is not in the rando array`);
      }
    }

    if (notSame === true)
    {
      randoArray = array;
      console.log(`The rando array is now: ${randoArray}`);
      return false;
    }
  }

  //console.log(`In checkLastShown: Array = ${array[0]}, ${array[1]}, ${array[2]} `);
  //console.log(`In checkLastShown: RandoArray= ${randoArray[0]}, ${randoArray[1]}, ${randoArray[2]} `);
}



function eventHandler(event){
  //event.stopPropagation();

  console.log(`Target: ${event.target.id}`);

  for (var i = 0; i < Product.allProducts.length; i++)
  {
    if (event.target.alt === Product.allProducts[i].productName)
    {
      Product.allProducts[i].countClicked();

      break;
    }
  }

  checkTotalClicks();
  showProducts();
}

function setEventListeners()
{
  productImages.addEventListener('click', eventHandler);
}


for (var i = 0; i < images[0].length; i++)
{
  new Product(images[0][i], images[1][i]);
}

setEventListeners();
showProducts();
