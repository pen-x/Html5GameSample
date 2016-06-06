var ctx;
var firstpick = true;
var firstcard;
var secondcard;
var frontbgcolor = "rgb(251,215,73)";
var polycolor = "rgb(254,11,0)";
var backcolor = "rgb(128,0,128)";
var tablecolor = "rgb(255,255,255)";
var cardrad = 30;
var deck = [];
var firstsx = 30;
var firstsy = 50;
var margin = 30;
var cardwidth = 4 * cardrad;
var cardheight = 4 * cardrad;
var matched;
var starttime;

function Card(sx, sy, swidth, sheight, info) {
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.info = info;
    this.draw = drawback;
}

function makedeck() {
    var i;
    var acard;
    var bcard;
    var cx = firstsx;
    var cy = firstsy;
    
    for (i = 3; i < 9; i++) {
        acard = new Card(cx, cy, cardwidth, cardheight, i);
        deck.push(acard);
        bcard = new Card(cx, cy + cardheight + margin, cardwidth, cardheight, i);
	deck.push(bcard);
	cx = cx + cardwidth + margin;
	acard.draw();
	bcard.draw();
    }

    shuffle();
}

function shuffle() {
    var i;
    var k;
    var holder;
    var dl = deck.length;
    var nt;
    
    for (nt = 0; nt < 3 * dl; nt++) {
        i = Math.floor(Math.random() * dl);
	k = Math.floor(Math.random() * dl);
	holder = deck[i].info;
	deck[i].info = deck[k].info;
	deck[k].ifno = holder;
    }
}

function Polycard(sx, sy, rad, n) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawpoly;
    this.n = n;
    this.angle = (2 * Math.PI) / n;
}

function drawpoly() {
    ctx.fillStyle = frontbgcolor;
    ctx.fillRect(this.sx - 2 * this.rad, this.sy - 2 * this.rad, 4 * this.rad, 4 * this.rad);
    ctx.beginPath();
    ctx.fillStyle = polycolor;
    var i;
    var rad = this.rad;
    ctx.moveTo(this.sx + rad * Math.cos(-0.5 * this.angle), this.sy + rad * Math.sin(-0.5 * this.angle));
    for (i = 1; i < this.n; i++) {
        ctx.lineTo(this.sx + rad * Math.cos((i-0.5) * this.angle), this.sy + rad * Math.sin((i-0.5) * this.angle));
    }
    ctx.fill();
}

function drawback()
