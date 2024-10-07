// analyzing process

// console.log(process);

// ! environment variables

// Accesignt he env variables
const appEnv = process.env.APP_ENV || "development";
// display the env
console.log(`Our node app is running ${appEnv}`);
// setting the env
// * run in command - $env:APP_ENV="production"; node app.js

// ! process.exit()
if (process.env.NODE_ENV !== "production") {
  // diplay error
  console.log("This shuold only run in production");
  process.exit();
}
