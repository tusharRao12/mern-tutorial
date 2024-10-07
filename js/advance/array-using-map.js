const shoppingCart = [
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

// add 10% discount

const discountedCart = shoppingCart.map((item)=>{
    return{
        name:item.name,
        price:item.price * 0.9,
    }
})

console.log(discountedCart)