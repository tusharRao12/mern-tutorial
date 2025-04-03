// let promise = new Promise((resolve,reject)=>{
//     console.log("Promise is created");
//     resolve("Success");
// })

const getPromise = () =>{
    return new Promise((resolve,reject)=>{
        console.log("Promise is created");
        resolve("Success");
        // reject("Err/or");
    })
}

let promise = getPromise();
promise.then(()=>{
    console.log("data");
})

promise.catch((err)=>{
    console.log(err);
})


function getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("data",dataId);
            resolve("success");
        }, 2000);
    })
}

getData(1).then((res)=>{
    return getData(2);
}).then((res)=>{
    return getData(3);
}).then((res)=>{
    return getData(4);
}).then((res)=>{
    return getData(5);
})