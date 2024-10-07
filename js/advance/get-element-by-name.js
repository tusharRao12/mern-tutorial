function submitForm(){
    const languageEl = document.getElementsByName('language');
    // console.log(languageEl)
    for(let i=0; i<languageEl.length;i++){
        if(languageEl[i].checked){
            console.log(languageEl[i].value)
        }
    }
}
