var wrapper = document.getElementById("subjectSelectorButton");
wrapper.addEventListener('click', function(){
  document.getElementById("subjectFileSelector").click();
});

var button = document.getElementById("subjectFileSelector");
button.addEventListener('change', function(){
	var reader = new FileReader();
  	reader.onload = function () {

    var values = JSON.parse(sessionStorage.getItem("subjectInputValues"));
    if ( values == null)
    {
    	values = {};
    }
    var name = button.files.item(0).name;

    var map = getMappedArray("subject",reader.result);
    values[name] = map;

    sessionStorage.setItem("subjectInputValues", JSON.stringify(values));

    document.getElementById("subjectGraphBarWrapper").innerHTML = "<svg id='subjectGraphBar' class='hbarchart'></svg>";
    document.getElementById("subjectGraphBar").innerHTML = "";
    document.getElementById("subjectGraphRadar").innerHTML = "<div class=\"radarchart\"></div>";

    horizontalBarChart(values);
    radarChart(values);

    var accordions = document.getElementsByClassName("accordion");
		for(i=0; i<accordions.length; i++){
			accordions[i].style.visibility = "visible";
		}
    var panels = document.getElementsByClassName("panel");
		for(i=0; i<accordions.length; i++){
			panels[i].style.visibility = "visible";
		}

  };

  var name = button.files.item(0).name;
  var names = JSON.parse(sessionStorage.getItem("subjectInputValues"));
  if (names == null)
  {
    names = [];
  }
  else{
    names = Object.keys(names);
  }
  //skips duplicates
  if( !arrayContains(names, name))
  {
    reader.readAsBinaryString(button.files[0]);
    //update verbose uploaded csvs
    var uploadedCsvs = document.getElementById("uploadedSubjectCsv");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(name));
    uploadedCsvs.appendChild(li);
  }

});

button.addEventListener('click',function(){
this.value = null;
return false;
});

function arrayContains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
