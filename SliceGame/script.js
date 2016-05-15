var cwidth = 400;
var cheight = 300;
var defaultdicex = 50;
var defaultdicey = 50;
var dicewidth = 100;
var diceheight = 100;
var dotrad = 6;
var ctx;
var dicex;
var dicey;
var firstturn = true;
var point;

function throwdice() {
	var sum;
    var ch = 1 + Math.floor(Math.random() * 6);
	sum = ch;
	dicex = defaultdicex;
	dicey = defaultdicey;
	drawface(ch);
	dicex = defaultdicex + 150;
	ch = 1 + Math.floor(Math.random() * 6);
	sum += ch;
	drawface(ch);
	if (firstturn) {
		switch (sum) {
			case 7:
			case 11:
				document.f.outcome.value = "You win!";
				break;
			case 2:
			case 3:
			case 12:
				document.f.outcome.value = "You lose!";
				break;
			default:
				point = sum;
				document.f.pv.value = point;
				firstturn = false;
				document.f.stage.value = "Need follow-up throw.";
				document.f.outcome.value = " ";
		}
	} else {
		switch (sum) {
			case point:
				document.f.outcome.value = "You win!";
				document.f.stage.value = "Back to first throw.";
				document.f.pv.value = " ";
				firstturn = true;
			case 7:
				document.f.outcome.value = "You lose!";
				document.f.stage.value = "Back to first throw.";
				document.f.pv.value = " ";
				firstturn = true;
		}
	}
}

function drawface(n) {
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.lineWidth = 5;
    ctx.clearRect(dicex, dicey, dicewidth, diceheight);
    ctx.strokeRect(dicex, dicey, dicewidth, diceheight);
    ctx.fillStyle = "#009966";

    switch(n) {
        case 1:
            draw1();
            break;
        case 2:
            draw2();
            break;
        case 3:
            draw2();
            draw1();
            break;
        case 4:
            draw4();
            break;
        case 5:
            draw4();
            draw1();
            break;
        case 6:
            draw4();
            draw2mid();
            break;
    }
}

function draw1() {
    var dotx;
    var doty;
    ctx.beginPath();
    dotx = dicex + 0.5 * dicewidth;
    doty = dicey + 0.5 * diceheight;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function draw2() {
    var dotx;
    var doty;
    ctx.beginPath();
    dotx = dicex + 3 * dotrad;
    doty = dicey + 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    dotx = dicex + dicewidth - 3 * dotrad;
    doty = dicey + diceheight - 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function draw4() {
    var dotx;
    var doty;
    ctx.beginPath();
    dotx = dicex + 3 * dotrad;
    doty = dicey + 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    dotx = dicex + dicewidth - 3 * dotrad;
    doty = dicey + diceheight - 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    dotx = dicex + 3 * dotrad;
    doty = dicey + diceheight - 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    dotx = dicex + dicewidth - 3 * dotrad;
    doty = dicey + 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function draw2mid() {
    var dotx;
    var doty;
    ctx.beginPath();
    dotx = dicex + 3 * dotrad;
    doty = dicey + 0.5 * diceheight;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    dotx = dicex + dicewidth - 3 * dotrad;
    doty = dicey + 0.5 * diceheight;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
