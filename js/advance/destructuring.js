// ----------------Array Destructuring------------------

// --basic
const numbers = [1,2,3,4]

const [first,seconde,third,fourth]  = numbers;
// console.log(first);
// console.log(numbers[2]);

// --- swap varibales 

let a = 1;
let b = 2;

[a,b] = [b,a];
// console.log(a,b);


//------------------Object Destructuring--------------------------

// Extract user data

const {name,age,email} = {
    name:'Tushar',
    age:22,
    email:'tushar@gmail.com'
}
console.log(age);

// Destructuring in Function Parameters

function greet({name,age}){
    // console.log(`Hello ${name}, you age is ${age}`);
}

const myUser = {
    name : 'Tushar',
    age : 22,
};

greet(myUser);


// ------------------Nested Desturcutring   ----------

const {id,info:{names,ages}}  = {
    id:1,
    info:{
        names:"Tushar",
        ages:22
    },
};
console.log(names)