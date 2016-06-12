var boxx = 20;
var boxy = 30;
var boxwidth = 350;
var boxheight = 250;
var ballrad = 10;

// boundary.
var boxboundx = boxwidth + boxx - ballrad;
var boxboundy = boxheight + boxy - ballrad;
var inboxboundx = boxx + ballrad;
var inboxboundy = boxy + ballrad;

var ballx = 50;
var bally = 60;
var ctx;
var ballvx = 4;
var ballvy = 8;

function init() {
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.linewidth = ballrad;
	ctx.fillStyle = "rgb(200, 0, 50)";
	moveball();
	setInterval(moveball, 100);
}

function moveball() {
	ctx.clearRect(boxx, boxy, boxwidth, boxheight);
	moveandcheck();
	ctx.beginPath();
	ctx.arc(ballx, bally, ballrad, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.strokeRect(boxx, boxy, boxwidth, boxheight);
}

function moveandcheck() {
	var nballx = ballx + ballvx;
	var nbally = bally + ballvy;
	if (nballx > boxboundx) {
		ballvx = - ballvx * 0.9;
		nballx = boxboundx;
	}
	if (nballx < inboxboundx) {
		ballvx = - ballvx * 0.9;
		nballx = inboxboundx;
	}
	if (nbally > boxboundy) {
		ballvy = - ballvy * 0.9;
		nbally = boxboundy;
	}
	if (nbally < inboxboundy) {
		ballvy = - ballvy * 0.9;
		nbally = inboxboundy;
	}
	ballx = nballx;
	bally = nbally;
}

function change() {
	ballvx = Number(f.hv.value);
	ballvy = Number(f.vv.value);
	return false;
}

document.body.onload = init;
document.f.onsubmit = change;