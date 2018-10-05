document.getElementById('exportReportBtn').addEventListener('click', exportReportDoc);


function exportReportDoc() {
    var svg;
    var imagesToAdd = [];
    var selectedSVGs = [];
    var widths = [];
    var heights = [];
    var hasBar = false;
    var isAnnual = false;
    var checkboxes = document.getElementsByClassName("checkbox");
    var type="";
    var dataType="";

    switch (sessionStorage.key(0)){
        case "subjectInputValues":
            dataType = "subjectInputValues";
            type = "Subject Area Analysis";
            break;
        case "yearInputValues" :
            dataType = "yearInputValues";
            type = "Annual Analysis";
            isAnnual = true;
            break;
        case "affiliationInputValues" :
            dataType = "affiliationInputValues";
            type = "Affiliation Analysis";
            break;
    }

    for(var i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked) {
            if (checkboxes[i].id == "lineCheckBox") {
                selectedSVGs.push("yearGraph");
            } else if (checkboxes[i].id == "barCheckBox") {
                selectedSVGs.push("affiliationGraphBarWrapper");
                hasBar=true;
            } else if (checkboxes[i].id == "RadarCheckBox") {
                selectedSVGs.push("affiliationGraphRadar");
            } else if (checkboxes[i].id == "subjectBarCheckBox") {
                selectedSVGs.push("subjectGraphBarWrapper");
                hasBar=true;
            } else if (checkboxes[i].id == "subjectRadarCheckBox") {
                selectedSVGs.push("subjectGraphRadar");
            }
        }
    }

    if(selectedSVGs.length<1){
        convertToDocX();
    }

        for (var i = 0; i < selectedSVGs.length; i++) {

            if (selectedSVGs[i] == "subjectGraphRadar"  || selectedSVGs[i] == "affiliationGraphRadar") svg = document.getElementById(selectedSVGs[i]).firstElementChild.firstElementChild;
            else svg = document.getElementById(selectedSVGs[i]).firstElementChild;

            widths.push(document.getElementById(selectedSVGs[i]).offsetWidth);
            heights.push(document.getElementById(selectedSVGs[i]).offsetHeight);

            svg.setAttribute("style", "background: white");

            var simg = new Simg(svg);
            simg.toCanvas(save)
            document.getElementById("tmpElement").remove();
        }

        function save(canvas) {
            imagesToAdd.push(canvas.toDataURL());
            if(imagesToAdd.length == selectedSVGs.length) convertToDocX();
         }



    var myimg = [];

    function loadFile(url, callback) {
        JSZipUtils.getBinaryContent(url, callback);
    }

    function convertToDocX() {
        var imageCount = imagesToAdd.length;
        var imageModule;
            for (var i = 0; i < imagesToAdd.length; i++) {
                myimg.push(base64DataURLToArrayBuffer(imagesToAdd[i]));
            }

            var opts = {};

            if (imageCount == 1) {
                opts.centered = false;
                opts.getImage = function (tagValue, tagName) {
                    return myimg[0];
                };

                opts.getSize = function (img, tagValue, tagName) {
                    if (hasBar) return [650, 750];
                    if (isAnnual) return [650, 350];
                    return [650, 500];
                };

                imageModule = new window.ImageModule(opts);
            }

            if (imageCount == 2) {
                opts.centered = false;
                opts.getImage = function (tagValue, tagName) {
                    if (tagName == 'image1') return myimg[0];
                    else if (tagName == 'image2') return myimg[1];
                };

                opts.getSize = function (img, tagValue, tagName) {
                    if (tagName == 'image1') {
                        return [650, 500];
                    } else if (tagName == 'image2') {
                        return [650, 750];
                    }
                };

                imageModule = new window.ImageModule(opts);

        }



        loadFile("./js/templates/reportTemplate.docx", function (err, content) {
            if (err) {
                throw err
            }
            var zip = new JSZip(content);
            var doc = new Docxtemplater().loadZip(zip);
            var data = retriveData();
            data.title = type;
            data.comments = document.getElementById("chartComments").value;
            if (imagesToAdd.length == 1){
                doc.attachModule(imageModule);
                data.image1 = imagesToAdd[0];
                data.hasImage1 = true;
                data.hasImage2 = false;
            }else if(imagesToAdd.length == 2){
                doc.attachModule(imageModule);
                data.image1 = imagesToAdd[0];
                data.image2 = imagesToAdd[1];
                data.hasImage1 = true;
                data.hasImage2 = true;
            }else{
                data.hasImage1 = false;
                data.hasImage2 = false;
            }
            doc.setData(data);
            doc.render();
            var out = doc.getZip().generate({
                type: "blob"
            });
            saveAs(out, "report.docx");
        });
    };


    function base64DataURLToArrayBuffer(dataURL) {
        const string_base64 = dataURL.replace(/^data:image\/png;base64,/, "");
        var binary_string;
        if (typeof window !== "undefined") {
            binary_string = window.atob(string_base64);
        }
        else {
            binary_string = new Buffer(string_base64, 'base64').toString('binary');
        }
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            var ascii = binary_string.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes.buffer;
    }


    function retriveData(){
        var values = JSON.parse(sessionStorage.getItem(dataType));
        var labels = [];
        var haveLabels = false;

        var series = [];
        for (var key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                var val = values[key];

                var obj = {};
                obj.label = key;
                obj.values = Array();

                for (var subkey in val) {
                    if (Object.prototype.hasOwnProperty.call(val, subkey)) {
                        var subval = val[subkey];

                        obj.values.push(subval);

                        if (!haveLabels)
                            labels.push(subkey);
                    }
                }
                haveLabels = true;
                series.push(obj);
            }
        }

        var lines = [];
        var tmpLine = [];
        tmpLine.push({value : ""});
        for (var i=0; i<series.length; i++){
            tmpLine.push({value : series[i].label});
        }
        lines.push({"line" : tmpLine});
        for(var i=0; i<labels.length; i++){
            var line = [];
            line.push({value : labels[i]})
            for (var j=0; j<series.length; j++){
                line.push({value : series[j].values[i]});
            }
            lines.push({"line" : line});
        }
        var data = {"lines" : lines}
        return data;
    }
}
