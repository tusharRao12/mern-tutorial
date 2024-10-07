// Basic example
const fruits = [
    {
    name:"apple",
    color:"red",
    },
    {
        name:"banana",
        color:"yellow",
    },
    {
        name:"cherry",
        color:"red",
    }
];

fruits.forEach((curr, index ,array)=>{
    // console.log(curr,index,array);
});

// Case Study :  Online shopping cart calculation

// Suppose you are workingon an e-commerce website and you need to calcuate the total price of items in a user's shooping carrt, Each item in cart is represented as an object in an array with properites such as name,price and quantity, Your task is to caluated the total cost of items in the car and also list the nae of all items in the cart for the user's review.


const cart = [
    {
        name:"Laptop",
        price:100000,
        qty:1
    },
    {
        name:"Phone",
        price:10000,
        qty:1
    },
    {
        name:"Tv",
        price:15000,
        qty:1
    },
    {
        name:"Headphone",
        price:1500,
        qty:3
    },
]

let totalCost = 0;
cart.forEach((item)=>{
    // Sum of the product prices
    totalCost += item.price * item.qty;
})
console.log(totalCost)
// list all the name of product
let itemNames = [];
cart.forEach((item)=>{
    itemNames.push(item.name);
})
console.log(itemNames);

// calcuate the total no of items

let totalItems = 0;
cart.forEach((item)=>{
    totalItems += item.qty
})
console.log(totalItems);