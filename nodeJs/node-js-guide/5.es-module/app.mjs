// !Defaut export
// import greet from "./utils.mjs";
// console.log(greet("Tushar"));

// !Name export
// import { add, sub } from "./utils.mjs";
// console.log(add(10, 5));
// console.log(sub(10, 5));

//  ! Mixed export
// import greet, { add, sub } from "./utils.mjs";
// console.log(greet("KK"));
// console.log(add(2, 8));

// ! import everything
import * as utils from "./utils.mjs";
console.log(utils.add(11, 11));
