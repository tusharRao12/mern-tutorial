// async function hello(){
//     console.log("hello");
// }
// hello();

// function api(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             console.log("weather data");
//             resolve("success");
//         }, 2000);
//     })
// }
// async function getWeataherData(){
//     let res = await api();
//     console.log(res);
// }
// getWeataherData();


function getData(dataId){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log(dataId);
            resolve('success')
        },2000)
    });
}

async function getAllData(){
    console.log('1')
    await getData(1);
    console.log("2");
    await getData(2);
    console.log("3");
    await getData(3);
    console.log("4");
    await getData(4);
    console.log("5");
    await getData(5);
}
getAllData();