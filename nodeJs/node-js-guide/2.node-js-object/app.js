// ?------Accessing the global object----------

// console.log(global);

// * Accesing the global object

global.myGlobal = "Helo from global object";

// console.log(global.myGlobal);
// * to check if our varaible is truly global

// console.log("myGlobal" in global);

// console.log(__dirname);
// console.log(__filename);

// ! Using set interval and clear Interval

let count = 0;
const interval = setInterval(() => {
  console.log("hello world");
  count++;
  if (count === 5) {
    clearInterval(interval);
  }
}, 1000);

// ! using set time out
setTimeout(() => {
  console.log("This will be delayed by 55");
}, 5000);
