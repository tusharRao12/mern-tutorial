// setTimeout --------

const showMessage = ()=>{
    // console.log("hello after 3 second")
}

setTimeout(showMessage,3000);
// cancelling a set time

const timeOutId = setTimeout(()=>{
    console.log('THis will not displayed');
},5000)
clearTimeout(timeOutId);



// set interval

setInterval(()=>{
    // console.log('Hello')
},2000)

let counter = 0;
const intervalId = setInterval(()=>{
    counter ++
    console.log(counter)
    if (counter >=5){
        clearInterval(intervalId)
    }
},2000)
