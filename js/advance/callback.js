function sum(a,b){
    console.log(a+b);
}

function calculate(a,b,callback){
    callback(a,b);
}


function getData(dataId,getNextData){
    setTimeout(() => {
        console.log(dataId);
        if(getNextData){
            getNextData();
        }
    }, 2000);
}


getData(1, ()=>{
    getData(2,()=>{
        getData(3,()=>{
            getData(4)
        })
    })
});
