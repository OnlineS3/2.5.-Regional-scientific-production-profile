var exportButtons = document.getElementsByClassName('exportPngButton');
for (var i = 0; i < exportButtons.length; i++) {
    exportButtons[i].addEventListener('click',exportPNG);
}

function exportPNG(){
    var svg;

    if(this.id == "affiliationBarChartExport"){
        svg = document.getElementById("affiliationGraphBarWrapper").firstElementChild;
    }
    else if(this.id == "affiliationRadarChartExport"){
        svg = document.getElementById("affiliationGraphRadar").firstElementChild.firstElementChild;
    }
    else if(this.id == "subjectBarChartExport"){
        svg = document.getElementById("subjectGraphBarWrapper").firstElementChild;
    }
    else if(this.id == "subjectRadarChartExport"){
        svg = document.getElementById("subjectGraphRadar").firstElementChild.firstElementChild;
    }
    else if(this.id == "yearLineChartExport"){
        svg = document.getElementById("yearGraph").firstElementChild;
    }

    svg.setAttribute("style", "background: white");
    var simg = new Simg(svg);
    simg.download("exported-chart");
    document.getElementById("tmpElement").remove();
}