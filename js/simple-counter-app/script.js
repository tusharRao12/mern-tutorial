// elemnt are loded

document.addEventListener("DOMContentLoaded",()=>{
    // select elemnt
    const counterValue = document.getElementById('counter-value')
    console.log(counterValue)
    const increaseBtn = document.getElementById('increase-btn');
    const decreaseBtn = document.getElementById('decrease-btn');
    const resetBtn = document.getElementById('reset-btn');

    // global value

    let count = 0;

    // add event listner to button
    increaseBtn.addEventListener('click',()=>{
        count ++;
        updateCounter()
    })
    decreaseBtn.addEventListener('click',()=>{
        count --;
        updateCounter()
    })
    resetBtn.addEventListener('click',()=>{
        count = 0;
        updateCounter()
    })

    function updateCounter(){
    counterValue.textContent= count;
    }
})


