// select fields for checking whether they are empty or not 
let fieldOfAmount = document.getElementById("amountInput");
let fieldOfTerm = document.getElementById("mTerm");
let fieldOfIntrest = document.getElementById("intrestRate");
let radioBtn1 = document.getElementById("repaymentButton");
let radioBtn2 = document.getElementById("intrestButton");
let containerRadio1 = document.getElementById("button1");
let containerRadio2 = document.getElementById("button2");
// select section where output will display
let sectionOfOutput = document.querySelector(".resultSection");
// select sign of dollar, percentage and years representer  
// when field is incorrect and by using these we will do their background red  
let otherInfos = document.querySelectorAll(".otherInfo");
let year=document.getElementById("years");
let perSymbol = document.getElementById("percentageS");
let dollar = document.getElementById("dollarSign");
let formFillButton = document.getElementById("showOutput"); // select button of fill form 
let formInHtml = document.getElementById("form1"); // select form to clear it 
// create function if user fill form then he will see results but if he again click on reset then he come again in default state 
function descriptionRsults(){
    sectionOfOutput.innerHTML =`
    <img src="illustration-empty.svg" alt="image of Illustration">
                <p id="infoP"><b>Results Show Here</b></p>
                <p id="description">Complete the form and click on <i>"Calculate Repayments"</i> to see what your
                    monthly repayments whould be.</p>
    `;
}
let months=12,monthlyAmount=0;
function calculateMonthlyPayments(){
    fieldOfAmount*(fieldOfIntrest/100);
    months=months*fieldOfTerm;
    monthlyAmount=fieldOfAmount/months;
    monthlyAmount*12;
    fieldOfAmount=fieldOfAmount-monthlyAmount;
    fieldOfTerm--;
}
// function to show error message with reference element
function displayErrorMessage(referenceElement) {
    let errorMessage = document.createElement("p");
    errorMessage.innerText = "Field is required!";
    errorMessage.classList.add("error-message"); // add class for future removal
    errorMessage.style.color = "hsl(4, 69%, 50%)";
    errorMessage.style.marginBottom = "0";
    referenceElement.after(errorMessage);
}
// function to change all stylings into normal state in case of error or refilling form
function clearStyles() {
    containerRadio1.style.border = "1px solid hsl(202, 55%, 16%)";
    containerRadio2.style.border = "1px solid hsl(202, 55%, 16%)";
    otherInfos.forEach(info=>
    {
        info.style.color = "hsl(200, 24%, 40%)";
        info.style.backgroundColor = "hsl(202, 76%, 87%)";
    }
    )
    // also remove all error messages on clear because if we dont do this at every click on button error messege rereated 
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());
}
// function to convert all inputs into number 
function convertDatatypesOfInputs(){
    fieldOfAmount=parseInt(fieldOfAmount);
    fieldOfIntrest=parseInt(fieldOfIntrest);
    fieldOfTerm=parseInt(fieldOfTerm);
}
let headTag = document.querySelector("head");
let newCss = document.createElement("style");
newCss.innerHTML = `
.container {
    width:63vw;
}
.resultSection{
    padding:0px 25px 0px 25px;
}
.amounts {
    background-color: hsl(203, 80%, 10%);
    color: hsl(200, 26%, 54%);
    display: flex;
    flex-direction: column;
    border-top: 3px solid hsl(61, 70%, 52%);
    border-radius: 5px;
    padding: 20px;
    text-align: start;
    line-height:1.65;
    width:90%;
}
.description {
    color: hsl(203, 41%, 72%);
    text-align: start;
}
#totalAmount,
#resultHeading {
    color: white;
}
#resultHeading{
margin-right:auto;
}
#monthlyAmounts {
    font-size: 2rem;
    color: hsl(61, 70%, 52%);
    margin: 0;
}
.monthlyRepayments {
    border-bottom: 1px solid hsl(203, 41%, 72%);
    padding-bottom: 20px;
}
.monthlyRepayments p:nth-of-type(1) {
    margin-bottom: 0;
    margin-top: 0;
}
.totalRepyments p:nth-of-type(1) {
    margin-bottom: 0;
    margin-top: 0;
}
.totalRepyments p:nth-of-type(2) {
    margin-bottom: 0;
    margin-top: 0;
}
.totalRepyments{
    padding-top: 20px;
}`;
function displayResults() {
    sectionOfOutput.innerHTML = `
 <p id="resultHeading"><b>Your Results</b></p>
    <p class="description">Your results are shown based on the information your provided.To adjust the results, edit the
        form and click on
        <b>"Calculate Repayments"</b> again.
    </p>
    <div class="amounts">
        <div class="monthlyRepayments">
            <p>Your Monthly Repayments</p>
            <p id="monthlyAmounts">monthly amounts</p>
        </div>
        <div class="totalRepyments">
            <p>Totally you will repay over the term</p>
            <p id="totalAmount"><b>total amount</b></p>
        </div>
    </div>`;
    sectionOfOutput.classList.add("resultSection");
    headTag.append(newCss);
}
// code to check if any field is missing, throw error message, if not show outputs
formInHtml.addEventListener("submit", (event) => {
    event.preventDefault(); // stop here page to reload
    // remove all previous error messages
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());// here we are removing all previous message
    if (
        fieldOfAmount.value == "" ||
        fieldOfIntrest.value == "" ||
        fieldOfTerm.value == "" ||
        (!radioBtn1.checked && !radioBtn2.checked)
    ) {
        if (fieldOfAmount.value == "") {
            dollar.style.backgroundColor = "hsl(4, 69%, 50%)";
            dollar.style.color = "white";
            displayErrorMessage(document.querySelector(".input-group"));
        }
        if (fieldOfTerm.value == "") {
            year.style.backgroundColor = "hsl(4, 69%, 50%)";
            year.style.color = "white";
        }
        if (fieldOfIntrest.value == "") {
            perSymbol.style.backgroundColor = "hsl(4, 69%, 50%)";
            perSymbol.style.color = "white";
        }
        if (fieldOfIntrest.value == "" || fieldOfTerm.value == "") {
            displayErrorMessage(document.querySelector(".uniLiners"));
        }
        if (!radioBtn1.checked && !radioBtn2.checked) {
            containerRadio1.style.border = "1.5px solid hsl(4, 69%, 50%)";
            containerRadio2.style.border = "1.5px solid hsl(4, 69%, 50%)";
            displayErrorMessage(document.querySelector("#button2"));
        }
    } else {
        displayResults();
        clearStyles();
    }
});
let clearButton = document.querySelector("#clear"); // select clear button
clearButton.addEventListener("click", () => {
    formInHtml.reset(); // clear form fields
    clearStyles(); // reset styles and remove errors
    descriptionRsults();// call this function if user set form output section come in its default state  
});

