var wrapper = document.getElementById("yearSelectorButton");
wrapper.addEventListener('click', function(){
  document.getElementById("yearFileSelector").click();
});

var button = document.getElementById("yearFileSelector");
button.addEventListener('change', function(){
	var reader = new FileReader();
  reader.onload = function () {

    var values = JSON.parse(sessionStorage.getItem("yearInputValues"));
    if ( values == null)
    {
    	values = {};
    }
    var name = button.files.item(0).name;
    // Remove file extension from filename
    var ext_pos = name.indexOf(".");
    name = name.substring(0, ext_pos);

    var map = getMappedArray("year",reader.result);
    values[name] = map;

    sessionStorage.setItem("yearInputValues", JSON.stringify(values));

    document.getElementById("yearGraphWrapper").innerHTML = "<div id='yearGraph' class='linechart'></div>";

    lineChart(values);

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
  var names = JSON.parse(sessionStorage.getItem("yearInputValues"));
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
    var uploadedCsvs = document.getElementById("uploadedYearCsv");
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
