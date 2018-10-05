
/**
*	Gets a text string of the CSV file and the type of file (year OR subject)
*
*	Returns a mapped array where KEY is the first column of the CSV file and the VALUE is the second column of the csv file
*
*	ex.
*
*	mappedArray["Medicine"] = 1580615
*	mappedArray["Biochemistry, Genetics and Molecular Biology"] = 604044
*	.
*	.
*
*	@param typeOfFile the type of file which can be {'year' OR 'subject'}
*	@param text the text of the CSV file
*
*/
function getMappedArray(typeOfFile,text){
	var splittedByNewLine = text.split('\n');
	var mappedArray = {};
	if(typeOfFile === 'year'){
		var yearLimitFound = false;
		var yearCounter=0;
		for(var i=splittedByNewLine.length-1; i > 0 ; i--){
            var splitedText = splittedByNewLine[i].split("\",\"");	//splits by ' "," '
            var splitedTextLength = splitedText.length;
            if(splitedTextLength == 2) {
            	var year = splitedText[0].replace(/"/g, "");
            	var number = parseInt(splitedText[1].replace(/"/g, ""));
            	if( !yearLimitFound && !isNaN(year) ){
            		yearCounter = parseInt(year);
            		yearLimitFound = true
            	}
            	if(parseInt(year) == yearCounter) {
            		mappedArray[year] = number;
            		yearCounter++;
            	}else{
            		break;
            	}
            }	//end if the both the 2 columns contain only digits
        }	//end for every line of the text
	}	//end if the type of file is 'year'
	else if(typeOfFile === 'subject'){
		for(var i=0; i < splittedByNewLine.length ; i++){
			var splitedText = splittedByNewLine[i].split("\",\"");
			var splitedTextLength = splitedText.length;
			if(splitedTextLength == 2 && !stringContainsDigits(splitedText[0]) && stringContainsDigits(splitedText[1])){
				var subjectArea = splitedText[0].replace(/"/g, ""); 
				var number =  parseInt(splitedText[1].replace(/"/g, "")); 
				mappedArray[subjectArea] = number;
			}	//end if the first column does not contain numbers and the second one contains numbers
		}	//end for every line of the text
	}	//end if the type of file is 'subject'
	var sortable = [];
	for(var att in mappedArray)
	{
		sortable.push([att, mappedArray[att]]);
	}
	sortable.sort(function(a, b){
		if(a[0] < b[0]) return -1;
		if(a[0] > b[0]) return 1;
		return 0;
	});

	var newmap = {};
	var i;
	var size = Object.keys(mappedArray).length;
	for(i = 0; i < size ; i++)
	{
		newmap[sortable[i][0]] = sortable[i][1];
	}
	mappedArray = newmap;
	return mappedArray;
}

/**
*	Reads a text file from local disk and returns the text. Used for debugging local files
*
*	@param file the file name to be read
*/
function readTextFile(file)
{
	var rawFile = new XMLHttpRequest();
	var allText = "";
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				allText = rawFile.responseText;
			}
		}
	}
	rawFile.send(null);

	return allText;
}

/**
* Returns whether a string includes only digits
*/
function stringIncludesOnlyDigits(str){
	return /^\d+$/.test(str);
}

/**
*	Returns whether the string inludes numbers
*/
function stringContainsDigits(str){
	return str.match(/\d+/g);
}
