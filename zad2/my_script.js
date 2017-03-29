
function addOwnOrder()
{
    const producent=document.getElementById('producent').value;
    const procesor=document.getElementById('procesor').value;
    const plGlowna=document.getElementById('plGlowna').value;
    const pRam=document.getElementById('pRam').value;
    const krGraf=document.getElementById('krGraf').value;
    const dyTwardy=document.getElementById('dyTwardy').value;

    const table =document.getElementsByTagName('table')[0];

    const newRow = table.insertRow(table.rows.length);
    
    const cel1 = newRow.insertCell(0);
    const cel2 = newRow.insertCell(1);
    const cel3 = newRow.insertCell(2);
    const cel4 = newRow.insertCell(3);
    const cel5 = newRow.insertCell(4);
    const cel6 = newRow.insertCell(5);
    
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
    const w = window.open('http://ug.edu.pl/kontakt','popup').focus();
    //w.document.write("fndsin");
    //w.document.close();
}
function Computer(json) {
    const self = this;
    self.producer = json.producer;
    self.procesor = json.procesor;
    self.mainboard = json.mainboard;
    self.ram = json.ram;
    self.graphics_card = json.graphics_card;
    self.hard_disk = json.hard_disk;
    self.toTableRow = () => `<tr><td>${self.producer}</td><td>${self.procesor}</td><td>${self.mainboard}</td><td>${self.ram}</td><td>${self.graphics_card}</td><td>${self.hard_disk}</td></tr>`


}
function ListOfComputers() {
    let computer = [];
    const self = this;

    self.addComputer = json => {
        computer.push(new Computer(json));
    }

    self.toTable = () => {
        let table = '<table class="table table-striped table-bordered">';
        table += generateTableHeader();
        for (let i = 0; i < computer.length; i++) {
            table += computer[i].toTableRow();
        }
        table += '</table>';
        return table;
    }

    var generateTableHeader = () => '<tr>'
        + '<th><b>PRODUCENT</b></th>'
        + '<th><b>PROCESOR</b></th>'
        + '<th><b>PLYTA GLOWNA</b></th>'
        + '<th><b>PAMIEC RAM</b></th>'
        + '<th><b>KARTA GRAFICZNA</b></th>'
        + '<th><b>DYSK TWARDY</b></th>'
        + '</tr>'

    self.clear = () => {
        computer = [];
    }
}

function getAccess(prepare) {
    const data = "json_data.json";
    $.getJSON(data).done(prepare);
}

function doList(data) {
    
    const listOfComputers = new ListOfComputers();
    $.each(data.computer, (i, computer) => {
        listOfComputers.addComputer(data.computer[i]);
       
    });
    const context = document.getElementById('table');
    context.innerHTML = listOfComputers.toTable();
}


function init() {
    getAccess(doList);
    
}


window.onload = init;