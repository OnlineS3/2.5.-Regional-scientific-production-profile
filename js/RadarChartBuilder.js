/*
Requires the following elements:
<div class="radarchartframe">
	<div class="radarchart"></div>
</div>

// Test data
var mappedArray = {};
mappedArray["Medicine"] = 1580615;
mappedArray["Biochemistry, Genetics and Molecular Biology"] = 604044;
mappedArray["Social Sciences"] = 495716;
mappedArray["Engineering"] = 479441;
mappedArray["Physics and Astronomy"] = 444424;
//mappedArray["Agrocultural and Biological Sciences"] = 339135;
//mappedArray["Arts and Humanities"] = 275277;
//mappedArray["Chemistry"] = 275208;
//mappedArray["Computer Science"] = 256722;
//mappedArray["Materials Science"] = 240475;
//mappedArray["Mathematics"] = 221701;
//mappedArray["Earth and Planetary Sciences"] = 209941;
//mappedArray["Pharmacology, Toxicology and Pharmaceutics"] = 207630;
//mappedArray["Environmental Science"] = 191668;
//mappedArray["Immunology and Microbiology"] = 191336;
//mappedArray["Neuroscience"] = 157890;
//mappedArray["Psychology"] = 142974;
//mappedArray["Business, Management and Accounting"] = 115743;
//mappedArray["Chemical Engineering"] = 103011;
//mappedArray["Nursing"] = 87626;
//mappedArray["Economics, Econometrics and Finance"] = 87432;
//mappedArray["Health Professions"] = 65205;
//mappedArray["Energy"] = 61191;
//mappedArray["Decision Sciences"] = 56533;
//mappedArray["Multidisciplinary"] = 51613;
//mappedArray["Veterinary"] = 44040;
//mappedArray["Dentistry"] = 28074;
//mappedArray["Undefined"] = 12441;

var mappedArray2 = {};
mappedArray2["Medicine"] = 2580615;
mappedArray2["Biochemistry, Genetics and Molecular Biology"] = 404044;
mappedArray2["Social Sciences"] = 555716;
mappedArray2["Engineering"] = 879441;
mappedArray2["Physics and Astronomy"] = 200424;

var dict = {};
dict["Region 1"] = mappedArray;
dict["Region 2"] = mappedArray2;
*/


function radarChart(dict){
var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = [];


//Data
var d = new Array();

for (var key in dict) {
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
        var val = dict[key];
        
        LegendOptions.push(key); // Assign legend title for entity
        
        var temp = Array();
        
        // Iterate through each mapped array
        for (var subkey in val) {
            if (Object.prototype.hasOwnProperty.call(val, subkey)) {
                var subval = val[subkey];

                var obj = {};
                obj.axis = subkey;
                obj.value = subval;
                
                temp.push(obj);
            }
        }
        
        d.push(temp);
    }
}


//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw(".radarchart", d, mycfg, dict);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('.radarchartframe')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(250,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "12px")
	  .text(function(d) { return d; })
	  ;	
}