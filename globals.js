movements=[];
movements2=[];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myJson = this.responseText;
    }
};
xhttp.open("GET", "loadWallet.php", false);
xhttp.send();

movements2 = JSON.parse(myJson);

console.log(movements2.length);




i = 1;



console.log(movements2[i].date);
while(movements2.length >=  i+1){
    newDate = movements2[i].date;
    newCause = movements2[i].cause;
    newValue = parseFloat(movements2[i].value);
    i++;
    oldAmountSpan = document.getElementById("amountValue");

    oldAmount = parseFloat(oldAmountSpan.textContent);

    oldAmountSpan.textContent = oldAmount + newValue;
    if(oldAmountSpan.classList.contains("positive") && (oldAmount + newValue) < 0){
        oldAmountSpan.classList.remove("positve");
        oldAmountSpan.classList.add("negative");
    } else if (oldAmountSpan.classList.contains("negative") && (oldAmount + newValue) >= 0){
        oldAmountSpan.classList.remove("negative");
        oldAmountSpan.classList.add("positive");
    }
    newLine = document.createElement("div");
    newLine.classList.add("tableRow");

    classKind = (newValue >=0)?"income":"outcome";
    newLine.classList.add(classKind);

    rowDate = document.createElement("div");
    rowDate.classList.add("rowDate");
    rowDate.textContent = newDate;

    rowCause = document.createElement("div");
    rowCause.classList.add("rowCause");
    rowCause.textContent = newCause;


    rowValue = document.createElement("div");
    rowValue.classList.add("rowValue");
    rowValue.textContent = newValue;

    newLine.appendChild(rowDate);
    newLine.appendChild(rowCause);
    newLine.appendChild(rowValue);

    document.getElementById("tableMovement").appendChild(newLine);
}


