
function Computer(json) {
    var self = this;
    self.producent = json.producent;
    self.id = json.id;
    self.procesor = json.procesor;
    self.plyta_glowna = json.plyta_glowna;
    self.pamiec_ram = json.pamiec_ram;
    self.karta_graficzna = json.karta_graficzna;
    self.dysk_twardy = json.dysk_twardy;
    

    self.toTableRow = function () {
        return '<tr><td>'
            + self.id
            + '</td><td>'
            + self.producent
            + '</td><td>'
            + self.procesor
            + '</td><td>'
            + self.plyta_glowna
            + '</td><td>'
            + self.pamiec_ram
            + '</td><td>'
            + self.karta_graficzna
            + '</td><td>'
            + self.dysk_twardy
         
            + '</td></tr>'
    }


}
function ListOfComputers() {
    var computer = [];
    var self = this;

    self.addComputer = function (json) {
        computer.push(new Computer(json));
    }

    self.toTable = function () {
        var table = '<table class="table table-striped table-bordered">';
        table += generateTableHeader();
        for (var i = 0; i < computer.length; i++) {
            table += computer[i].toTableRow();
        }
        table += '</table>';
        return table;
    }

    var generateTableHeader = function () {
        return '<tr>'
            + '<th><b>ID</b></th>'
            + '<th><b>PRODUCENT</b></th>'
            + '<th><b>PROCESOR</b></th>'
            + '<th><b>PLYTA GLOWNA</b></th>'
            + '<th><b>PAMIEC RAM</b></th>'
            + '<th><b>KARTA GRAFICZNA</b></th>'
            + '<th><b>DYSK TWARDY</b></th>'
            + '</tr>';
    }

    self.clear = function () {
        computer = [];
    }
}

function getAccess(prepare) {
    var data = "date.json";
    $.getJSON(data).done(prepare);
}

function doList(data) {
    
    var listOfComputers = new ListOfComputers();
    $.each(data.akcesoria, function (i, akcesoriaes) {
        listOfComputers.addComputer(data.akcesoria[i]);
       
    });
    var context = document.getElementById('table');
    context.innerHTML = listOfComputers.toTable();
}


function init() {
    getAccess(doList);
    document.getElementById('table').innerHTML = "Ładowanie danych....";

}

/*
$(document).ready(function(){
    $.getJSON("date.jason", function(data)
    {
        $.each(data.akcesoria, function(){
            $("ul").append("<li>"+this['producent']+"</li><li>"+this['producent']+"</li><br />");
        });
    });
});
*/








