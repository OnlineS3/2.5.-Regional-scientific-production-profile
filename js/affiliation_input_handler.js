var wrapper = document.getElementById("affiliationSelectorButton");
wrapper.addEventListener('click', function(){
	document.getElementById("affiliationFileSelector").click();
});

var button = document.getElementById("affiliationFileSelector");
button.addEventListener('change', function(){
	var reader = new FileReader();
	reader.onload = function () {
		var name = button.files.item(0).name;
		var map = getMappedArray("subject",reader.result);

		var size = Object.keys(map).length;
		if( size > 30)
		{
			var sortable = [];
			for(var att in map)
			{
				sortable.push([att, map[att]]);
			}
			sortable.sort(function(a, b) {
				return b[1] - a[1];
			});

			var newmap = {};
			var counter = 0;
			var i;
			for(i = 0; i < 30 ; i++)
			{
				newmap[sortable[i][0]] = sortable[i][1];
			}
			map = newmap;
		}
		var values = {};
		values[name] = map;

		document.getElementById("affiliationGraphBarWrapper").innerHTML = "<svg id='affiliationGraphBar' class='hbarchart'></svg>";
		document.getElementById("affiliationGraphBar").innerHTML = "";
		document.getElementById("affiliationGraphRadar").innerHTML = "<div class=\"radarchart\"></div>";

		sessionStorage.setItem("affiliationInputValues", JSON.stringify(values));

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

	reader.readAsBinaryString(button.files[0]);
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
