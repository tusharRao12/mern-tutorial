// ---------Create a blocking

console.log('Start blocking operations')

// creating blocking code

for(let i = 0;i<1e9; i++){
    // console.log(i);
}

console.log('FInish blocking operations');


//----------creatte a non blocking

console.log('Start non blocking operations')
setTimeout(()=>{
    console.log('Executing dely')
},4000)
console.log('Finish non blocking operations')