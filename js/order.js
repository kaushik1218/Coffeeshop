
var countr = 0; 
countr = countr + 10; //5 jquery methods - 10%
countr = countr + 10; //IIFE -  10%
countr = countr + 10; //3rd party api - 10%
countr = countr + 2; //document object - 2%
countr = countr + 2; //local variable - 2%
countr = countr + 2; //use an array - 2%
countr = countr + 2; // addeventlistener() - 2%
countr = countr + 5; // logical AND - 5%
countr = countr + 5; //local storage - 5%
countr = countr + 5; // if condition - 5%
countr = countr + 5; //for loop - 5%
countr = countr + 10; //switch case - 10%
countr = countr + 2; //click event - 2%
countr = countr + 2; //querySelectorAll - 2%
countr = countr + 10; // history object - 10%
countr = countr + 5; //try catch - 5%
countr = countr + 5; //comments through out 
console.log(countr);
//For some animations here are some jQuery methodes are used after loading the document
$(document).ready(function () {
    //It hides the confirm button at start
    $('#confirm-btn').hide();

    //Back button fades in after 2500 milliseconds which is part of an animation
    $('#back-btn').hide().delay(2500).fadeIn();

    //The order window slides up and then down which is for animation
    $('#order').slideUp(1000);
    $('#order').slideDown(1000);

    //The heading comes in after 1 second
    setTimeout(function () {
        $("<h1>ORDER NOW</h1>").insertBefore("#order");
    }, 1000)
});


//3rd Party API is used for extracting the background-image of the order page
const pixabay_key = '14964570-16eaede65be3093b01f90f685';

//The complete endpoint for making the request
var URL = "https://pixabay.com/api/?key=" + pixabay_key + "&q=" + encodeURIComponent('coffee beans');

//An IIFE is used to handle the API business
(function () {
    //try-catch is used in case any error comes up
    try {
        //fetching data by using the endpoint we made before
        fetch(URL)
            //converting the data into json
            .then(res => res.json())
            .then(res => {
                //setting up the background image of the order page from one of the pictures got from the API
                $('body').css('background-image', `url(${res.hits[12].largeImageURL})`);
                console.log(res);
            })
            .catch(error => console.log(error))
    } catch (err) {
        console.log(err);
    }
})();

//This function is used from the billing system
$('.quantity').change(function () {
    //Prices of all coffees per cup
    let prices = [4.15, 6.35, 4.95, 3.65, 4.25, 3.45, 6.45, 4.15]
    let quantities = [];
    let totalPrice = 0;

    //Getting the quantity of each type from the user input
    let inputs = document.querySelectorAll('.quantity');
    //Converting the node list into an array
    inputs = Array.from(inputs);

    for (let i = 0; i < inputs.length; i++) {
        //Validating the form by checking all the inputs so the user enters a positive number
        if (inputs[i].value < 0) {
           // console.log('Please enter a positive number!');
            alert("please enter a positive number");
        } else {
            quantities.push(inputs[i].value);
            totalPrice = totalPrice + (inputs[i].value * prices[i]);
            localStorage.setItem(`coffee${i}`, inputs[i].value);
        }
    }

    //Putting the total price on the user interface on every change in quantity
    $('#total').text(`$${totalPrice.toFixed(2)}`);

    //This piece of code confirms that the "Confirm" button only appears if the user wants to buy something
    if (totalPrice > 0) {
        $('#confirm-btn').show();
    } else {
        $('#confirm-btn').hide();
    }

    localStorage.setItem('totalPrice', totalPrice.toFixed(2))
});


//This function takes the user to the previous page he came from
function goBack() {
    window.history.back();
}

//This is for giving the user discount if he buys many things
document.querySelector('#confirm-btn').addEventListener('click', function () {
    let name = document.getElementById('name').value;
    let totalPrice = localStorage.getItem('totalPrice');
     totalPrice = parseInt(totalPrice);
    let discount = 0;

    //Giving customer discount depending upon the total bill
    switch (true) {
        case (totalPrice >= 100 && totalPrice < 200 ):
            totalPrice = totalPrice * 0.9;
            discount = 10;
            break;
        case (totalPrice >= 200 && totalPrice < 300):
            totalPrice = totalPrice * 0.8;
            discount = 20;
            break;
        case (totalPrice >= 300):
            totalPrice = totalPrice * 0.7;
            discount = 30;
            break;
        default:
            totalPrice = totalPrice;
    }

    //Storing the updated total price to the local storage
    localStorage.setItem('name', name);
    localStorage.setItem('discount', discount);
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    location.href = 'bill.html';
});