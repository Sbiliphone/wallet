function addNewItem(){

	newDate=document.getElementById("newDate").value;
	newCause=document.getElementById("newCause").value;
	newValue= parseFloat( document.getElementById("newValue").value );

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

function save(){

	var rows = document.getElementById("tableMovement").children;

	for(i=1; i<rows.length;i++){
		row = rows[i];
		obj = {};
		obj.date = row.children[0].textContent;
		obj.cause = row.children[1].textContent;
		obj.value = row.children[2].textContent;

		movements.push(obj);
	}

	json = JSON.stringify(movements);


	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("debug").textContent = "Salvataggio avvenuto";
		}
	};
	xhttp.open("POST", "saveWallet.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("content="+json);

	console.log("salvato");

}















