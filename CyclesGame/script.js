var cwidth = 600;
var cheight = 400;
var ctx;
var everything = [];
var rockbx = 50;
var rockby = 300;
var paperbx = 150;
var paperby = 300;
var scissorsbx = 250;
var scissorsby = 300;
var canvas1;
var newscore;
var size = 15;
var result;
var choices = ["rock.jpg", "paper.jpg", "scissors.jpg"];
var compimg = new Image();
var beats = [
    ["TIE: you both threw rock", "You win: computer played rock", "You lose: computer threw rock"],
    ["You lose: computer threw paper", "TIE: you both threw paper", "You win: computer threw paper"],
    ["You win: computer threw scissors", "You lose: computer threw scissors", "TIE: you both threw scissors"]
];

var points = [[0, 1, -1], [-1, 0, 1], [1, -1, 0]];

function Throw(sx, sy, smargin, swidth, sheight, rectcolor, picture) {
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.bwidth = swidth + 2 * smargin;
    this.bheight = sheight + 2 * smargin;
    this.sheight = sheight;
    this.fillstyle = rectcolor;
    this.draw = drawThrow;
    this.img = new Image();
    this.img.src = picture;
    this.smargin = smargin;
}

function drawThrow() {
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.strokeRect(this.sx, this.sy, this.bwidth, this.bheight);
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(this.sx, this.sy, this.bwidth, this.bheight);
    ctx.drawImage(this.img, this.sx + this.smargin, this.sy + this.smargin, this.swidth, this.sheight);
}

function choose(ev) {
    var compch = Math.floor(Math.random() * 3);
    var compchn = choices[compch];
    compimg.src = compchn;
    var mx;
    var my;
    if (ev.layerX || ev.layerX == 0) {
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var i;
    for (i = 0; i < everything.length; i++) {
        var ch = everything[i];
        if ((mx > ch.sx) && (mx < ch.sx + ch.bwidth) && (my > ch.sy) && (my < ch.sy + ch.bheight)) {
            drawall();
            size = 15;
            tid = setInterval(flyin, 100);
            result = beats[compch][i];
            newscore = Number(document.f.score.value);
            newscore += points[compch][i];
            break;
        }
    }
}

function flyin() {
    ctx.drawImage(compimg, 70, 100, size, size);
    size += 5;
    if (size > 50) {
        clearInterval(tid);
        ctx.fillText(result, 200, 100, 250);
        document.f.score.value = String(newscore);
    }
}

var rockb = new Throw(rockbx, rockby, 8, 50, 50, "rgb(250, 0, 0)", "rock.jpg");
var paperb = new Throw(paperbx, paperby, 8, 50, 50, "rgb(0, 200, 200)", "paper.jpg");
var scib = new Throw(scissorsbx, scissorsby, 8, 50, 50, "rgb(0, 0, 200)", "scissors.jpg");
everything.push(rockb);
everything.push(paperb);
everything.push(scib);

function init() {
    document.f.score.value = "0";
    ctx = document.getElementById('canvas').getContext('2d');
    canvas1 = document.getElementById('canvas');
    canvas1.addEventListener('click', choose, false);
    drawall();
    ctx.font = "bold 16pt Georgia";
    ctx.fillStyle = "blue";
}

function drawall() {
    ctx.clearRect(0, 0, cwidth, cheight);
    var i;
    for (i = 0; i < everything.length; i++) {
        everything[i].draw();
    }
}
