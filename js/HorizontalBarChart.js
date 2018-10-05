/*
Requires the following element:
<svg class="hbarchart"></svg>

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


// Build labels array
function horizontalBarChart(dict){

var haveLabels = false;
var labels = [];

var series = [];

for (var key in dict) {
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
        var val = dict[key];
        
        var obj = {};
        obj.label = key; // Assign legend title for entity
        obj.values = Array();
        
        // Iterate through each mapped array
        for (var subkey in val) {
            if (Object.prototype.hasOwnProperty.call(val, subkey)) {
                var subval = val[subkey];
                
                // Build values array
                obj.values.push(subval);   

                // Build labels array
                if (!haveLabels)
                    labels.push(subkey);
            }
        }
        haveLabels = true;
        series.push(obj);
    }
}

var data = {
  labels,
  series
};

var chartWidth       = 350,
	barHeight        = 20,
	groupHeight      = barHeight * data.series.length,
	gapBetweenGroups = 10,
	spaceForLabels   = 320,
	spaceForLegend   = 150;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
	zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
	.domain([0, d3.max(zippedData)])
	.range([0, chartWidth]);

var y = d3.scale.linear()
	.range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
	.scale(y)
	.tickFormat('')
	.tickSize(0)
	.orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".hbarchart")
	.attr("width", spaceForLabels + chartWidth + spaceForLegend)
	.attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
	.data(zippedData)
	.enter().append("g")
	.attr("transform", function(d, i) {
	  return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
	});

// Create rectangles of the correct width
bar.append("rect")
	.attr("fill", function(d,i) { return color(i % data.series.length); })
	.attr("class", "hbar")
	.attr("width", x)
	.attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
	.attr("x", function(d) { return x(d) - 3; })
	.attr("y", barHeight / 2)
	.attr("fill", "red")
	.attr("dx", function(d) {
        if (x(d) > 250)
            return "0px";
        else
            return "50px";
    })
	.attr("dy", ".35em")
	.text(function(d) { return d; });

// Draw labels
bar.append("text")
	.attr("class", "label")
	.attr("x", function(d) { return - 10; })
	.attr("y", groupHeight / 2)
	.attr("dy", ".35em")
	.text(function(d,i) {
	  if (i % data.series.length === 0)
		return data.labels[Math.floor(i/data.series.length)];
	  else
		return ""})
    .on("click", function(d,i) {
           var temp_bar_dict = JSON.parse(JSON.stringify(dict));
           var labelToRemove = "";
           if (i % data.series.length === 0)
              labelToRemove = data.labels[Math.floor(i/data.series.length)];
           else
              labelToRemove = "";

           document.getElementsByClassName("hbarchart")[0].innerHTML = "";

           for (var key in temp_bar_dict) {
                if (Object.prototype.hasOwnProperty.call(temp_bar_dict, key)) {
                    var val = temp_bar_dict[key];
                    delete temp_bar_dict[key][labelToRemove];

                }
           }

           horizontalBarChart(temp_bar_dict);
    });

chart.append("g")
	  .attr("class", "y haxis")
	  .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
	  .call(yAxis);

// Draw legend
var legendRectSize = 18,
	legendSpacing  = 4;

var legend = chart.selectAll('.legend')
	.data(data.series)
	.enter()
	.append('g')
	.attr('transform', function (d, i) {
		var height = legendRectSize + legendSpacing;
		var offset = -gapBetweenGroups/2;
		var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
		var vert = i * height - offset;
		return 'translate(' + horz + ',' + vert + ')';
	});

legend.append('rect')
	.attr('width', legendRectSize)
	.attr('height', legendRectSize)
	.style('fill', function (d, i) { return color(i); })
	.style('stroke', function (d, i) { return color(i); });

legend.append('text')
	.attr('class', 'legend')
	.attr('x', legendRectSize + legendSpacing)
	.attr('y', legendRectSize - legendSpacing)
	.text(function (d) { return d.label; });
}