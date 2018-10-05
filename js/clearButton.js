var clearButtons = document.getElementsByClassName("clearButton");
for (var i = 0; i < clearButtons.length; i++) {
	var b = clearButtons[i];
	b.addEventListener('click', function(){

	sessionStorage.clear();

		if(b.id == "affiliationClearButton"){
			document.getElementById("affiliationGraphBarWrapper").innerHTML = "<img class='img-responsive' src='img/before_results.jpg'>";
    	document.getElementById("affiliationGraphRadar").innerHTML = "<img class='img-responsive' src='img/before_results.jpg'><div class=\"radarchart\"></div>";
    }
    else if(b.id == "subjectClearButton"){
    	document.getElementById("subjectGraphBarWrapper").innerHTML = "<img class='img-responsive' src='img/before_results.jpg'>";
    	document.getElementById("subjectGraphRadar").innerHTML = "<img class='img-responsive' src='img/before_results.jpg'><div class=\"radarchart\"></div>";
    	document.getElementById("uploadedSubjectCsv").innerHTML = "";
    }
    else{
    	document.getElementById("yearGraphWrapper").innerHTML = "<img class='img-responsive' src='img/before_results.jpg'>";
    	document.getElementById("uploadedYearCsv").innerHTML = "";
    }

		var accordions = document.getElementsByClassName("accordion");
		for(i=0; i<accordions.length; i++){
			accordions[i].style.visibility = "hidden";
		}
		var panels = document.getElementsByClassName("panel");
		for(i=0; i<accordions.length; i++){
			panels[i].style.visibility = "hidden";
		}
});
}
