var facts = [
    ["China", "Beijing", false],
    ["India", "New Delhi", false],
    ["European Union", "Brussels", false],
    ["United States", "Washington,DC", false],
    ["Indonesia", "Jakarta", false],
    ["Brazil", "Brasilia", false],
    ["Russia", "Moscow", false],
    ["Japan", "Tokyo", false],
    ["Mexico", "Mexico City", false],
    ["Germany", "Berlin", false],
    ["Turkey", "Ankara", false],
    ["France", "Paris", false],
    ["United Kingdom", "London", false],
    ["Italy", "Rome", false],
    ["South Africa", "Pretoria", false],
    ["South Korea", "Seoul", false],
    ["Argentina", "Buenos Aires", false],
    ["Canada", "Ottawa", false],
    ["Saudi Arabia", "Riyadh", false],
    ["Australia", "Canberra", false]
];

var thingelem;
var nq = 4;
var elementinmotion;
var makingmove = false;
var inbetween = 300;
var col1 = 20;
var row1 = 200;
var rowsize = 50;
var slots = new Array(nq);

function init() {
    setupgame();
}

function setupgame() {
    var i;
    var c;
    var s;
    var mx = col1;
    var my = row1;
    var d;
    var uniqueid;
    for (i = 0; i < facts.length; i++) {
        facts[i][2] = false;
    }

    for (i = 0; i < nq; i++) {
        slots[i] = -100;
    }

    for (i = 0; i < nq; i++) {
        do {
            c = Math.floor(Math.random() * facts.length);
        } while (facts[c][2] == true)
        facts[c][2] = true;
        uniqueid = "c" + String(c);
        d = document.createElement('country');
        d.innerHTML = ("<div class='thing' id='" + uniqueid + "'>placeholder</div>");
        document.body.appendChild(d);
        thingelem = document.getElementById(uniqueid);
        thingelem.textContent = facts[c][0];
        thingelem.style.top = String(my) + "px";
        thingelem.style.lfet = String(mx) + "px";
        thingelem.addEventListener('click', pickelement, false);

        uniqueid = "p" + String(c);
        d = document.createElement('cap');
        d.innerHTML = ("<div class='thing' id='" + uniqueid + "'>placeholder</div>");
        document.body.appendChild(d);
        thingelem = document.getElementById(uniqueid);
        thingelem.textContent = facts[c][1];

        do {
            s = Math.floor(Math.random() * nq);
        } while (slots[s] >= 0)

        slots[s] = c;
        thingelem.style.top = String(row1 + s * rowsize) + "px";
        thingelem.style.left = String(col1 + inbetween) + "px";
        thingelem.addEventListener('click', pickelement, false);
        my += rowsize;
    }

    document.f.score.value = "0";
    return false;
}

function pickelement(ev) {
    var thisx;
    var thisxn;
    var sc;
    if (makingmove) {
        if (this == elementinmotion) {
            elementinmotion.style.backgroundColor = "white";
            makingmove = false;
            return;
        }

        thisx = this.style.left;
        thisx = thisx.substring(0, thisx.length - 2);
        thisxn = Number(thisx) + 110;
        elementinmotion.style.left = String(thisxn) + "px";
        elementinmotion.style.top = this.style.top;
        makingmove = false;
        if (this.id.substring(1) == elementinmotion.id.substring(1)) {
            elementinmotion.style.backgroundColor = "gold";
            document.f.out.value = "RIGHT";
            sc = 1 + Number(document.f.score.value);
            document.f.score.value = String(sc);
            if (sc == nq) {
                v = document.getElementById("vid");
                v.style.visibility = "visible";
            }
        } else {
            document.f.out.value = "WRONG";
            elementinmotion.style.backgroundColor = "white";
        }
    } else {
        makingmove = true;
        elementinmotion = this;
        elementinmotion.style.backgroundColor = "tan";
    }
}
        
document.body.onload = init;
