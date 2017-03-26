
function addOwnOrder()
{
    var producent=document.getElementById('producent').value;
    var procesor=document.getElementById('procesor').value;
    var plGlowna=document.getElementById('plGlowna').value;
    var pRam=document.getElementById('pRam').value;
    var krGraf=document.getElementById('krGraf').value;
    var dyTwardy=document.getElementById('dyTwardy').value;

    var table =document.getElementsByTagName('table')[0];

    var newRow = table.insertRow(table.rows.length);

    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);
    var cel6 = newRow.insertCell(5);
    
    if((producent!='') && (procesor!='') && (plGlowna!='') && (pRam!='') && (krGraf!='') && (dyTwardy!='')){
        
        cel1.innerHTML = producent;
        cel2.innerHTML = procesor;
        cel3.innerHTML = plGlowna;
        cel4.innerHTML = pRam;
        cel5.innerHTML = krGraf;
        cel6.innerHTML = dyTwardy;
    }
    else{
        alert('Brak wartosci we wszystkich polach!!');
    }

    return false;
    


}


function resetOwnOrder(){
    document.getElementById("forma").reset();
}

function myContact(){
    var w = window.open('http://ug.edu.pl/kontakt','popup').focus();
    //w.document.write("fndsin");
    //w.document.close();
}
function Computer(json) {
    var self = this;
    self.producer = json.producer;
    self.procesor = json.procesor;
    self.mainboard = json.mainboard;
    self.ram = json.ram;
    self.graphics_card = json.graphics_card;
    self.hard_disk = json.hard_disk;
    

    self.toTableRow = function () {
        return '<tr><td>'
            + self.producer
            + '</td><td>'
            + self.procesor
            + '</td><td>'
            + self.mainboard
            + '</td><td>'
            + self.ram
            + '</td><td>'
            + self.graphics_card
            + '</td><td>'
            + self.hard_disk
         
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
    var data = "json_data.json";
    $.getJSON(data).done(prepare);
}

function doList(data) {
    
    var listOfComputers = new ListOfComputers();
    $.each(data.computer, function (i, computer) {
        listOfComputers.addComputer(data.computer[i]);
       
    });
    var context = document.getElementById('table');
    context.innerHTML = listOfComputers.toTable();
}


function init() {
    getAccess(doList);
    
}


window.onload = init;










