/*
Requires the following element:
<div class="linechart"></div>

// Test data
var mappedArray = {};
mappedArray["2010"] = 18;
mappedArray["2011"] = 23;
mappedArray["2012"] = 13;
mappedArray["2013"] = 19;

var mappedArray2 = {};
mappedArray2["2010"] = 12;
mappedArray2["2011"] = 43;
mappedArray2["2012"] = 22;
mappedArray2["2013"] = 11;

var dict = {};
dict["Region 1"] = mappedArray;
dict["Region 2"] = mappedArray2;

*/

function lineChart(dict){

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var priceline = d3.svg.line()	
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.publications); });

// Adds the svg canvas
var svg = d3.select(".linechart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");


// Get the data
var data = Array();

for (var key in dict) {
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
        var val = dict[key];
        
        // Iterate through each mapped array
        for (var subkey in val) {
            if (Object.prototype.hasOwnProperty.call(val, subkey)) {
                var subval = val[subkey];

                var obj = {};
                obj.symbol = key; // Assign legend title for entity
                obj.year = parseDate(subkey);
                obj.publications = subval;
                data.push(obj);
            }
        }
    }
}


// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.year; }));
y.domain([0, d3.max(data, function(d) { return d.publications; })]);

// Nest the entries by symbol
var dataNest = d3.nest()
    .key(function(d) {return d.symbol;})
    .entries(data);

var color = d3.scale.category10();   // set the colour scale

legendSpace = width/dataNest.length; // spacing for the legend
    
    
    
function make_x_axis() {        
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(10)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
}

svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )
    

// Loop through each symbol / key
dataNest.forEach(function(d,i) { 

    svg.append("path")
        .attr("class", "line")
        .style("stroke", function() { // Add the colours dynamically
            return d.color = color(d.key); })
        .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
        .attr("d", priceline(d.values));

    // Add the Legend
    svg.append("text")
        .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
        .attr("y", height + (margin.bottom/2)+ 5)
        .attr("class", "legend")    // style the legend
        .style("fill", function() { // Add the colours dynamically
            return d.color = color(d.key); })
        .on("click", function(){
            // Determine if current line is visible 
            var active   = d.active ? false : true,
            newOpacity = active ? 0 : 1; 
            // Hide or show the elements based on the ID
            d3.select("#tag"+d.key.replace(/\s+/g, ''))
                .transition().duration(100) 
                .style("opacity", newOpacity); 
            // Update whether or not the elements are active
            d.active = active;
            })  
        .text(d.key); 

});

// Add the X Axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the Y Axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
}