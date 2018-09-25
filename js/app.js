'use strict';

// DONE - Store the clicks in a global variable
var totalClicks = 0;
var images = [['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg','./img/pet-sweep.jpg', './img/scissors.jpg','./img/shark.jpg','./img/sweep.png','./img/tauntaun.jpg','./img/unicorn.jpg','./img/usb.gif','./img/water-can.jpg','./img/wine-glass.jpg'], ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']];

var productImages = document.getElementById('product-images');
var productOnLeft = document.getElementById('product1');
var productInMiddle = document.getElementById('product2');
var productOnRight = document.getElementById('product3');
var surveyResults = document.getElementById('survey-results');
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

Product.prototype.selectionRate = function()
{
  var results = Math.floor(((this.productSelected / this.productShown) * 100));
  
  if (NaN)
  {
    return 'This product was not shown';
  }
  else
  {
    return results;
  }
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


function checkTotalClicks()
{
  totalClicks += 1;
  console.log('Total Clicks = ', totalClicks);
  if (totalClicks === 25)
  {
    productImages.removeEventListener('click', eventHandler);

    for (var i = 0; i < Product.allProducts.length; i++)
    {
      addElement('li', `${Product.allProducts[i].productName}: Shown - ${Product.allProducts[i].productShown} times, Selected - ${Product.allProducts[i].productSelected} times with a ${Product.allProducts[i].selectionRate()}% selection rate. `, surveyResults);
    }
  }
}


function checkUniqueness(array)
{
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

function checkLastShown(array)
{
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
        notSame = false;

        return true;
      }
    }

    if (notSame === true)
    {
      randoArray = array;
      return false;
    }
  }
}

function addElement(element, content, parent)
{
  var newElement = document.createElement(element);
  var newContent = document.createTextNode(content);

  newElement.appendChild(newContent);
  parent.appendChild(newElement);

  return newElement;
}

function eventHandler(event){
  //event.stopPropagation();
  
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
