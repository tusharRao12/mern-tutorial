const fs = require("fs");

// !Read a file

// Synchronous

const dataBuffer = fs.readFileSync("./sample.txt");
const content = dataBuffer.toString();
console.log(content);

// Asyncoronous

fs.readFile("./sample.txt", "utf8", (err, content) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log(content);
  }
});

// !  Write to a file

// write using asyncronus
fs.writeFile("./write.txt", "Tushar works in rdx", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("done");
  }
});

// append in the written file
fs.appendFile("./write.txt", "Appended conent", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("append done");
  }
});

// !check if file already exist

fs.access("./sample.txt", fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File not exist");
  } else {
    console.log("file exists");
  }
});

// !delete a file
fs.unlink("./delete.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("file deleted");
  }
});
