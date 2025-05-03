let clearButton=document.querySelector("#clear");// select clear button if user click on this form will clear because clear button is not in form so we use JS to clear form 
let formInHtml=document.getElementById("form1");// select form to clear it 
clearButton.addEventListener("click",()=>{
    formInHtml.reset();
});

