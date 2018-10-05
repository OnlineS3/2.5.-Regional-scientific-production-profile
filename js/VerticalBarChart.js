/*
Requires the following element:
<div class="vbarchart"></div>
*/

// Test data
/*
var mappedArray = {};
mappedArray["2017"] = 118;
mappedArray["2016"] = 580;
mappedArray["2015"] = 603;
mappedArray["2014"] = 551;
mappedArray["2013"] = 474;
mappedArray["2012"] = 465;
mappedArray["2011"] = 432;
mappedArray["2010"] = 415;
mappedArray["2009"] = 401;
mappedArray["2008"] = 355;
mappedArray["2007"] = 355;
mappedArray["2006"] = 300;
mappedArray["2005"] = 231;
mappedArray["2004"] = 151;
mappedArray["2003"] = 192;
mappedArray["2002"] = 138;
mappedArray["2001"] = 136;
mappedArray["2000"] = 116;
mappedArray["1999"] = 88;
mappedArray["1998"] = 92;

var mappedArray2 = {};
mappedArray2["2010"] = 12;
mappedArray2["2011"] = 43;
mappedArray2["2012"] = 22;
mappedArray2["2013"] = 11;
*/

function verticalBarChart(dict){	

var margin = {top: (parseInt(d3.select('div.vbarchart').style('width'), 10)/10), right: (parseInt(d3.select('div.vbarchart').style('width'), 10)/20), bottom: (parseInt(d3.select('div.vbarchart').style('width'), 10)/5), left: (parseInt(d3.select('div.vbarchart').style('width'), 10)/20)},
	width = parseInt(d3.select('div.vbarchart').style('width'), 10) - margin.left - margin.right,
	height = parseInt(d3.select('div.vbarchart').style('height'), 10) - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
	.range([height, 0]);

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
	.range(colorRange.range());

var xAxis = d3.svg.axis()
	.scale(x0)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(d3.format(".2s"));

var divTooltip = d3.select("div.vbarchart").append("div").attr("class", "toolTip");


var svg = d3.select("div.vbarchart").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var dataset = Array();

var mappedArray = Object.values(dict)[0];
//console.log(mappedArray);

for (var key in mappedArray) {
	if (Object.prototype.hasOwnProperty.call(mappedArray, key)) {
		var obj = {};
        
		obj.label = key;
        for (var dictkey in dict) {
            if (Object.prototype.hasOwnProperty.call(dict, dictkey)) {
                var val = dict[dictkey];
                obj[dictkey] = val[key];
            }
        }

		dataset.push(obj);
	}
}

var options = d3.keys(dataset[0]).filter(function(key) { return key !== "label"; });

dataset.forEach(function(d) {
	d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
});

x0.domain(dataset.map(function(d) { return d.label; }));
x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, d3.max(dataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);

svg.append("g")
	.attr("class", "x vaxis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "y vaxis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Number of publications");

var bar = svg.selectAll(".vbar")
	.data(dataset)
	.enter().append("g")
	.attr("class", "rect")
	.attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; });

bar.selectAll("rect")
	.data(function(d) { return d.valores; })
	.enter().append("rect")
	.attr("width", x1.rangeBand())
	.attr("x", function(d) { return x1(d.name); })
	.attr("y", function(d) { return y(d.value); })
	.attr("value", function(d){return d.name;})
	.attr("height", function(d) { return height - y(d.value); })
	.style("fill", function(d) { return color(d.name); });

bar
	.on("mousemove", function(d){
		divTooltip.style("left", d3.event.pageX+10+"px");
		divTooltip.style("top", d3.event.pageY-25+"px");
		divTooltip.style("display", "inline-block");
		var x = d3.event.pageX, y = d3.event.pageY
		var elements = document.querySelectorAll(':hover');
		l = elements.length
		l = l-1
		elementData = elements[l].__data__
		divTooltip.html("<br>"+elementData.name+"<br>"+elementData.value);
	});
bar
	.on("mouseout", function(d){
		divTooltip.style("display", "none");
	});


var legend = svg.selectAll(".legend")
	.data(options.slice())
	.enter().append("g")
	.attr("class", "legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", color);

legend.append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d; });
}