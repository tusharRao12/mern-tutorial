// --------ways of exproting moudules in comons js
// ! Single Function export
// ! object export
// ! Named function export
// ! using export shorthand

// ? Single Function Export

const firstName = "Tushar";

const greet = (name) => {
  return `Hello ${name}`;
};

// module.exports = firstName;
// module.exports = greet;

// ? Object exports

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

// module.exports = {
//   add,
//   sub,
// };

// ? Named function export
// module.exports.sayHi = (name) => {
//   return `Hi ${name}`;
// };
// module.exports.sayBye = (name) => {
//   return `Bye ${name}`;
// };

// ? using export shorthand
exports.sayHi = (name) => {
  return `Hi ${name}`;
};
exports.sayBye = (name) => {
  return `Bye ${name}`;
};
