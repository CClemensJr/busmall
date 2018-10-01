'use strict';

var maxClicks = 25;
var totalClicks = 0;
var images = [['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg','./img/pet-sweep.jpg', './img/scissors.jpg','./img/shark.jpg','./img/sweep.png','./img/tauntaun.jpg','./img/unicorn.jpg','./img/usb.gif','./img/water-can.jpg','./img/wine-glass.jpg'], ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']];

var productImages = document.getElementById('product-images');
var productOnLeft = document.getElementById('product1');
var productInMiddle = document.getElementById('product2');
var productOnRight = document.getElementById('product3');
var productElements = [productOnLeft, productInMiddle, productOnRight];
var currentProducts = [];
var previousProducts = [];


function Product(filepath, filename) {
  this.productImgSrc = filepath;
  this.productName = filename;
  this.productShown = 0;
  this.productClicked = 0;

  Product.allProducts.push(this);
}
Product.allProducts = [];


function loadProducts() {
  var localProducts = localStorage.getItem('products');
  var products = JSON.parse(localProducts);

  if (products && products.length) {
    console.log('Found it in local storage', products);
    Product.allProducts = products;
  }
  else {
    for (var i = 0; i < images[0].length; i++)
    {
      new Product(images[0][i], images[1][i]);
    }
  }

  console.log(Product.allProducts);
}

function showProducts()
{
  var randomProducts = getRandomProducts();
  console.log(`In show products. received ${randomProducts} from getRandomProducts()`);

  for (var j = 0; j < randomProducts.length; j++)
  {
    productElements[j].src = Product.allProducts[randomProducts[j]].productImgSrc;
    productElements[j].alt = Product.allProducts[randomProducts[j]].productName;

    Product.allProducts[randomProducts[j]].productShown++;
  }
  console.log(Product.allProducts);
}

function getRandomProducts()
{
  currentProducts = [];

  for (var i = 0; i < productElements.length; i++)
  {
    var shown = false;

    while (!shown) {
      var n = rando(0, Product.allProducts.length - 1);

      if (!previousProducts.includes(n))
      {
        if (!currentProducts.includes(n))
        {
          currentProducts.push(n);
          shown = true;
        }
      }
    }
  }

  previousProducts = currentProducts;

  return currentProducts;
}

function rando(min, max)
{
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return randomNumber;
}

function getSelectionRate(clicked, shown)
{
  var results = Math.floor((clicked / shown) * 100);
  if (results)
  {
    return results;
  }
  else
  {
    return 0;
  }
}

function createChart()
{
  var timesShown = [];
  var timesSelected = [];
  var selectionRates = [];

  for (var i = 0; i < Product.allProducts.length; i++)
  {
    timesShown.push(Product.allProducts[i].productShown);
    timesSelected.push(Product.allProducts[i].productClicked);
    selectionRates.push(getSelectionRate(Product.allProducts[i].productClicked, Product.allProducts[i].productShown));
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var shownOrSelectedChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: images[1],
      datasets: [{
        label: 'Times Shown',
        data: timesShown,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      },
      {
        label: 'Times Selected',
        data: timesSelected,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      },
      {
        label: 'Selection Percentage',
        data: selectionRates,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 3
      }],
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            max: 100,
            min: 0,
            stepSize: 10
          }
        }],
        yAxes: [{
        }]
      }
    }
  });
}

function handleClick(event){
  for (var i = 0; i < Product.allProducts.length; i++)
  {
    if (event.target.alt === Product.allProducts[i].productName)
    {
      Product.allProducts[i].productClicked++;
    }
  }

  totalClicks++;

  if (totalClicks >= maxClicks){
    toggleEventHandler();
    localStorage.setItem('products', JSON.stringify(Product.allProducts));
    createChart();
  }
  else {
    showProducts();
  }
}

function toggleEventHandler()
{
  if (totalClicks >= maxClicks){
    productImages.removeEventListener('click', handleClick);
  }
  else {
    productImages.addEventListener('click', handleClick);
  }
}

loadProducts();
showProducts();
toggleEventHandler();
